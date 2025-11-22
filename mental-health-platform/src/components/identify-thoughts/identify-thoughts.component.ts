import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-identify-thoughts',
  standalone: true,
  templateUrl: './identify-thoughts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentifyThoughtsComponent {
  dataService = inject(DataService);
  router = inject(Router);

  goToNextStep() {
    this.dataService.unlockStep('challenge');
    this.router.navigate(['/challenge']);
  }

  goToPreviousStep() {
    this.router.navigate(['/log']);
  }
}