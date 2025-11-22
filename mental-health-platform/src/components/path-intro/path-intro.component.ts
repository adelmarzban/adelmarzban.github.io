import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-path-intro',
  standalone: true,
  templateUrl: './path-intro.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PathIntroComponent {
  dataService = inject(DataService);
  router = inject(Router);

  goToNextStep() {
    this.dataService.unlockStep('log');
    this.router.navigate(['/log']);
  }
}