
import { Injectable, signal } from '@angular/core';

export interface Notification {
  message: string;
  isError: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  notification = signal<Notification | null>(null);

  show(message: string, isError = false) {
    this.notification.set({ message, isError });
    setTimeout(() => this.notification.set(null), 3500);
  }
}
