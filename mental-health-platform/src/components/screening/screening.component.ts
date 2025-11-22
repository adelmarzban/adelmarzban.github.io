import { Component, ChangeDetectionStrategy, inject, signal, computed, effect } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-screening',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screening.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreeningComponent {
  dataService = inject(DataService);
  router = inject(Router);
  notificationService = inject(NotificationService);

  readonly questions = [
    "1. احساس غم یا ناامیدی", "2. بی‌علاقگی یا لذت‌نبردن از فعالیت‌ها", "3. تغییر در اشتها یا وزن", "4. مشکلات خواب", "5. احساس خستگی مفرط", "6. احساس بی‌ارزشی یا گناه", "7. مشکل در تمرکز", "8. کندی یا بی‌قراری روانی-حرکتی", "9. افکار مرگ یا خودکشی", "10. احساس پوچی", "11. کاهش انگیزه", "12. انزوا از دیگران", "13. نگرانی مزمن و بی‌دلیل", "14. تنش عضلانی یا بی‌قراری", "15. تپش قلب ناگهانی", "16. تعریق زیاد", "17. لرزش یا احساس لرزش", "18. احساس خفگی یا تنگی نفس", "19. درد یا ناراحتی در قفسه سینه", "20. سرگیجه یا سبکی سر", "21. ترس از مردن", "22. ترس از دیوانه شدن", "23. جدا شدن از واقعیت", "24. از دست دادن کنترل", "25. انرژی زیاد یا غیرعادی", "26. نیاز کم به خواب", "27. پرحرفی", "28. افزایش عزت نفس یا بزرگ‌بینی", "29. افکار سریع", "30. حواس‌پرتی", "31. افزایش فعالیت هدف‌دار", "32. رفتارهای پرخطر", "33. تحریک‌پذیری شدید", "34. تصمیم‌گیری‌های غیرمنطقی", "35. ولخرجی یا بی‌ملاحظگی", "36. مصرف مواد یا الکل", "37. تغییرات خلق‌وخوی شدید", "38. فعالیت جنسی بیش‌ازحد", "39. ترس از فضاهای باز", "40. ترس از تنها ماندن", "41. ترس از حضور در مکان‌های شلوغ", "42. اجتناب از مکان‌های خاص", "43. افکار مزاحم و ناخواسته", "44. شک مداوم و وسواس فکری", "45. رفتارهای تکراری مثل شستن یا چک‌کردن", "46. ترس از قضاوت دیگران", "47. اجتناب از صحبت در جمع", "48. اضطراب در موقعیت‌های اجتماعی", "49. سرخ شدن یا لرزش در جمع"
  ];
  
  answers = signal<boolean[]>([]);
  screeningResults = signal<string[] | null>(null);

  constructor() {
    this.answers.set(this.dataService.userData()?.answers ?? new Array(this.questions.length).fill(false));
  }

  toggleAnswer(index: number) {
    this.answers.update(currentAnswers => {
      const newAnswers = [...currentAnswers];
      newAnswers[index] = !newAnswers[index];
      this.dataService.updateAnswers(newAnswers);
      return newAnswers;
    });
  }

  analyze() {
    const results: string[] = [];
    const d = this.answers();
    if ((d[0] || d[1]) && d.slice(2, 12).filter(a => a).length >= 4) { results.push("افسردگی"); } 
    else if ((d[0] && d[1]) && d.slice(2, 12).filter(a => a).length >= 3) { if (!results.includes("افسردگی")) { results.push("افسردگی"); } }
    if (d[12] && d[13]) { results.push("اضطراب فراگیر"); }
    if (d.slice(14, 20).filter(a => a).length >= 2 && d.slice(20, 24).filter(a => a).length >= 1) { results.push("حمله پانیک"); }
    if (d.slice(24, 38).filter(a => a).length >= 4 && results.includes("افسردگی")) { results.push("اختلال دوقطبی"); }
    if (d.slice(38, 42).some(a => a)) { results.push("هراس از مکان (آگورافوبیا)"); }
    if (d.slice(42, 44).some(a => a)) { results.push("وسواس فکری"); }
    if (d[44]) { results.push("وسواس عملی"); }
    if (results.includes("وسواس فکری") && results.includes("وسواس عملی")) { results.push("وسواس فکری-عملی"); }
    if (d.slice(45, 49).some(a => a)) { results.push("اضطراب اجتماعی"); }
    
    this.screeningResults.set(results);
    this.notificationService.show("نتایج تحلیل و ذخیره شد.");
  }
  
  clearForm() {
    const clearedAnswers = new Array(this.questions.length).fill(false);
    this.answers.set(clearedAnswers);
    this.dataService.updateAnswers(clearedAnswers);
    this.screeningResults.set(null);
    this.notificationService.show("فرم پاک شد.");
  }

  goToNextStep() {
    this.dataService.unlockStep('intro');
    this.router.navigate(['/intro']);
  }
}