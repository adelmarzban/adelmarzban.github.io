import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { ThoughtLogEntry, NegativeThought } from '../../models';
import { ICONS } from '../../icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thought-log',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './thought-log.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThoughtLogComponent {
  private fb = inject(FormBuilder);
  router = inject(Router);
  dataService = inject(DataService);
  private notificationService = inject(NotificationService);

  thoughtLog = computed(() => this.dataService.userData()?.thoughtLog ?? []);
  
  newThoughtForm = this.fb.group({
    situation: ['', Validators.required],
    feelings: this.fb.group({
      sad: [0, [Validators.min(0), Validators.max(10)]],
      happy: [0, [Validators.min(0), Validators.max(10)]],
      anxious: [0, [Validators.min(0), Validators.max(10)]]
    }),
    negativeThoughts: this.fb.array([this.createThoughtGroup()])
  });

  editThoughtForm = this.fb.group({
    id: [null as number | null],
    situation: ['', Validators.required],
    feelings: this.fb.group({
      sad: [0, [Validators.min(0), Validators.max(10)]],
      happy: [0, [Validators.min(0), Validators.max(10)]],
      anxious: [0, [Validators.min(0), Validators.max(10)]]
    }),
    negativeThoughts: this.fb.array([])
  });

  editingEntryId = signal<number | null>(null);
  activeKebabMenu = signal<number | null>(null);

  readonly ICONS = ICONS;

  get newNegativeThoughts() {
    return this.newThoughtForm.get('negativeThoughts') as FormArray;
  }
  
  get editNegativeThoughts() {
    return this.editThoughtForm.get('negativeThoughts') as FormArray;
  }

  createThoughtGroup(desc = '', score: number | string = '') {
    return this.fb.group({
      id: [null as number | null],
      description: [desc, Validators.required],
      score: [score, [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  addThoughtToNewForm() {
    this.newNegativeThoughts.push(this.createThoughtGroup());
  }

  removeThoughtFromNewForm(index: number) {
    if (this.newNegativeThoughts.length > 1) {
      this.newNegativeThoughts.removeAt(index);
    }
  }
  
  addThoughtToEditForm() {
    this.editNegativeThoughts.push(this.createThoughtGroup());
  }

  removeThoughtFromEditForm(index: number) {
    this.editNegativeThoughts.removeAt(index);
  }

  saveNewThought() {
    if (this.newThoughtForm.invalid) {
      this.notificationService.show("لطفاً فرم را به درستی پر کنید.", true);
      return;
    }
    const formValue = this.newThoughtForm.getRawValue();
    const newEntry: ThoughtLogEntry = {
      id: Date.now(),
      situation: formValue.situation,
      feelings: [
        { name: 'غم', score: formValue.feelings.sad ?? 0 },
        { name: 'خشم', score: formValue.feelings.happy ?? 0 },
        { name: 'اضطراب', score: formValue.feelings.anxious ?? 0 }
      ],
      negativeThoughts: formValue.negativeThoughts
        .filter(t => t.description && t.score)
        .map(t => ({
          id: Date.now() + Math.random(),
          description: t.description,
          score: Number(t.score),
          challenge_distortion: '', challenge_experience: '', challenge_others: '', challenge_anotherWay: '',
          alternativeThought: '', conclusion: ''
      }))
    };
    this.dataService.addThoughtLog(newEntry);
    this.notificationService.show("یادداشت جدید ثبت شد.");
    this.newThoughtForm.reset({ feelings: { sad: 0, happy: 0, anxious: 0 } });
    while (this.newNegativeThoughts.length > 1) this.newNegativeThoughts.removeAt(1);
    this.newNegativeThoughts.at(0).reset();
    this.dataService.unlockStep('identify');
  }

  deleteThought(id: number) {
    if (window.confirm("آیا از حذف این یادداشت اطمینان دارید؟")) {
      this.dataService.deleteThoughtLog(id);
      this.notificationService.show("یادداشت حذف شد.");
    }
  }

  openEditModal(entry: ThoughtLogEntry) {
    this.activeKebabMenu.set(null);
    this.editingEntryId.set(entry.id);
    this.editThoughtForm.patchValue({
      id: entry.id,
      situation: entry.situation,
      feelings: {
        sad: entry.feelings.find(f => f.name === 'غم')?.score ?? 0,
        happy: entry.feelings.find(f => f.name === 'خشم')?.score ?? 0,
        anxious: entry.feelings.find(f => f.name === 'اضطراب')?.score ?? 0
      }
    });
    this.editNegativeThoughts.clear();
    entry.negativeThoughts.forEach(thought => {
      this.editNegativeThoughts.push(this.fb.group({
          id: [thought.id],
          description: [thought.description, Validators.required],
          score: [thought.score, [Validators.required, Validators.min(0), Validators.max(10)]]
      }));
    });
  }

  closeEditModal() {
    this.editingEntryId.set(null);
  }

  updateThought() {
    if (this.editThoughtForm.invalid) {
      this.notificationService.show("لطفاً فرم را به درستی پر کنید.", true);
      return;
    }
    const formValue = this.editThoughtForm.getRawValue();
    const updatedEntry: Partial<ThoughtLogEntry> = {
      id: formValue.id!,
      situation: formValue.situation,
      feelings: [
        { name: 'غم', score: formValue.feelings.sad ?? 0 },
        { name: 'خشم', score: formValue.feelings.happy ?? 0 },
        { name: 'اضطراب', score: formValue.feelings.anxious ?? 0 }
      ],
      negativeThoughts: formValue.negativeThoughts
      .filter(t => t.description && t.score !== null)
      .map(t => {
        const original = this.getOriginalThought(formValue.id!, t.id);
        return { 
          ...original,
          id: original.id || Date.now() + Math.random(),
          description: t.description,
          score: Number(t.score)
        };
      })
    };
    this.dataService.updateThoughtLog(updatedEntry);
    this.notificationService.show("یادداشت به‌روزرسانی شد.");
    this.closeEditModal();
  }

  getOriginalThought(entryId: number, thoughtId: number | null): NegativeThought {
      const entry = this.thoughtLog().find(e => e.id === entryId);
      const thought = entry?.negativeThoughts.find(t => t.id === thoughtId);
      return thought || {
          id: thoughtId || 0, description: '', score: 0, 
          challenge_distortion: '', challenge_experience: '', challenge_others: '', challenge_anotherWay: '',
          alternativeThought: '', conclusion: ''
      };
  }

  isEntryCompleted(entry: ThoughtLogEntry): boolean {
    return entry.negativeThoughts.every(t => t.alternativeThought && t.conclusion);
  }

  toggleKebabMenu(entryId: number, event: Event) {
    event.stopPropagation();
    this.activeKebabMenu.update(current => (current === entryId ? null : entryId));
  }
  
  goToChallenge() {
    this.dataService.unlockStep('challenge');
    this.router.navigate(['/challenge']);
  }
}