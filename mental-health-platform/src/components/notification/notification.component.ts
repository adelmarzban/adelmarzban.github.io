import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (notification(); as notif) {
      <div 
        class="fixed bottom-4 left-1/2 transform -translate-x-1/2 py-3 px-6 rounded-full shadow-lg text-white font-bold text-center z-50 transition-opacity duration-500"
        [class.bg-blue-500]="!notif.isError"
        [class.bg-red-500]="notif.isError">
        {{ notif.message }}
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  private notificationService = inject(NotificationService);
  notification = this.notificationService.notification.asReadonly();
}