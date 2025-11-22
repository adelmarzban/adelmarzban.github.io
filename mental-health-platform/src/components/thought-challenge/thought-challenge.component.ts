import { Component, ChangeDetectionStrategy, inject, computed, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { ThoughtLogEntry, NegativeThought, Feeling } from '../../models';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thought-challenge',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './thought-challenge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThoughtChallengeComponent implements OnInit {
  private dataService = inject(DataService);
  router = inject(Router);
  private notificationService = inject(NotificationService);
  private fb = inject(FormBuilder);

  challengeForm: FormGroup = this.fb.group({
    thoughts: this.fb.array([])
  });

  entryToChallenge = signal<ThoughtLogEntry | undefined>(undefined);

  ngOnInit() {
    this.findNextEntry();
  }
  
  get thoughtsArray(): FormArray {
    return this.challengeForm.get('thoughts') as FormArray;
  }

  findNextEntry() {
    const allEntries = this.dataService.userData()?.thoughtLog ?? [];
    const entry = allEntries.find(e => 
      e.negativeThoughts.some(t => !t.alternativeThought || !t.conclusion)
    );
    this.entryToChallenge.set(entry);

    if (entry) {
      this.buildFormForEntry(entry);
    } else {
      this.thoughtsArray.clear();
    }
  }

  buildFormForEntry(entry: ThoughtLogEntry) {
    this.thoughtsArray.clear();
    const incompleteThoughts = entry.negativeThoughts.filter(t => !t.alternativeThought || !t.conclusion);
    
    incompleteThoughts.forEach(thought => {
      this.thoughtsArray.push(this.fb.group({
        id: [thought.id],
        challenge_distortion: [thought.challenge_distortion],
        challenge_experience: [thought.challenge_experience],
        challenge_others: [thought.challenge_others],
        challenge_anotherWay: [thought.challenge_anotherWay],
        alternativeThought: [thought.alternativeThought, Validators.required],
        conclusion: [thought.conclusion, Validators.required]
      }));
    });
  }

  getThoughtDescription(thoughtId: number): string {
    return this.entryToChallenge()?.negativeThoughts.find(t => t.id === thoughtId)?.description ?? '';
  }

  getThoughtScore(thoughtId: number): number {
    return this.entryToChallenge()?.negativeThoughts.find(t => t.id === thoughtId)?.score ?? 0;
  }

  formatFeelings(feelings: Feeling[]): string {
    return feelings.map(f => `${f.name}: ${f.score}/10`).join(' - ');
  }
  
  saveChallenge() {
    if (this.challengeForm.invalid) {
      this.notificationService.show('لطفا تمام فیلدهای افکار جایگزین و نتیجه گیری را پر کنید.', true);
      return;
    }
    const entry = this.entryToChallenge();
    if (!entry) return;

    const formValues = this.challengeForm.value.thoughts;
    
    const updatedThoughts = entry.negativeThoughts.map(originalThought => {
      const formThought = formValues.find((ft: any) => ft.id === originalThought.id);
      if (formThought) {
        return { ...originalThought, ...formThought };
      }
      return originalThought;
    });

    const updatedEntry: Partial<ThoughtLogEntry> = {
      ...entry,
      negativeThoughts: updatedThoughts
    };
    
    this.dataService.updateThoughtLog(updatedEntry);
    this.notificationService.show("مرحله با موفقیت تکمیل و ذخیره شد.");

    this.findNextEntry(); // Find the next one to challenge
  }

  goToPreviousStep() {
    this.router.navigate(['/log']);
  }
}
