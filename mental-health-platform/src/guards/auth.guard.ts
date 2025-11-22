import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataService } from '../services/data.service';

export const authGuard: CanActivateFn = () => {
  const dataService = inject(DataService);
  const router = inject(Router);

  if (dataService.currentUser()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};