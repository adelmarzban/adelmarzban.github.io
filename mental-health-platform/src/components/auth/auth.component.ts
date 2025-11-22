import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dataService = inject(DataService);
  private notificationService = inject(NotificationService);

  isLoginMode = signal(true);

  authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  toggleMode() {
    this.isLoginMode.update(value => !value);
    this.authForm.reset();
  }

  handleAuth() {
    if (this.authForm.invalid) {
      this.notificationService.show('لطفا فرم را به درستی پر کنید.', true);
      return;
    }

    const { email, password } = this.authForm.value;
    if (!email || !password) return;

    if (this.isLoginMode()) {
      if (this.dataService.login(email, password)) {
        this.notificationService.show('با موفقیت وارد شدید.');
        this.router.navigate(['/']);
      } else {
        this.notificationService.show('نام کاربری یا رمز عبور اشتباه است.', true);
      }
    } else {
      if (this.dataService.signup(email, password)) {
        this.notificationService.show('ثبت‌نام با موفقیت انجام شد.');
        this.router.navigate(['/']);
      } else {
        this.notificationService.show('این ایمیل قبلاً ثبت‌نام شده است.', true);
      }
    }
  }

  handleClearAllData() {
    if (window.confirm("آیا مطمئن هستید؟ تمام اطلاعات ذخیره شده (حساب‌های کاربری و یادداشت‌ها) برای همیشه حذف خواهند شد. این عمل غیرقابل بازگشت است.")) {
        this.dataService.clearAllData();
        this.isLoginMode.set(true);
        this.authForm.reset();
        this.notificationService.show("تمام اطلاعات با موفقیت حذف شد.");
    }
  }
}