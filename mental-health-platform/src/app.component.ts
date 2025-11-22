import { Component, ChangeDetectionStrategy, inject, signal, computed, effect } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

import { DataService } from './services/data.service';
import { NotificationComponent } from './components/notification/notification.component';
import { JourneyStep } from './models';
import { ICONS } from './icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NotificationComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  dataService = inject(DataService);
  router = inject(Router);

  isLoggedIn = computed(() => !!this.dataService.currentUser());
  userEmail = computed(() => this.dataService.currentUser()?.email);
  unlockedSteps = computed(() => this.dataService.userData()?.unlockedSteps ?? ['screening']);

  isSidebarOpen = signal(false);
  currentStepId = signal('screening');
  
  readonly journeySteps: JourneyStep[] = [
    { id: 'screening', title: 'گام ۱: تست غربالگری', icon: ICONS.screening },
    { id: 'intro', title: 'گام ۲: راهنمای مطالعه', icon: ICONS.intro },
    { id: 'log', title: 'گام ۳: ثبت افکار', icon: ICONS.log },
    { id: 'identify', title: 'گام ۴: شناخت خطاها', icon: ICONS.identify },
    { id: 'challenge', title: 'گام ۵: چالش افکار', icon: ICONS.challenge }
  ];
  readonly ICONS = ICONS;

  currentStep = computed(() => this.journeySteps.find(s => s.id === this.currentStepId()));

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(event => {
      const currentRoute = event.urlAfterRedirects.split('/')[1];
      this.currentStepId.set(currentRoute || 'screening');
      this.dataService.saveCurrentStep(this.currentStepId());
      this.closeSidebar();
    });

    effect(() => {
        if(this.isLoggedIn()){
            const savedStep = this.dataService.loadCurrentStep();
            if(savedStep && this.unlockedSteps().includes(savedStep) && this.router.url !== `/${savedStep}`){
                this.router.navigate([`/${savedStep}`]);
            }
        }
    });
  }

  logout() {
    this.dataService.logout();
    this.router.navigate(['/login']);
  }

  openSidebar() {
    this.isSidebarOpen.set(true);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
