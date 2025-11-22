
import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ScreeningComponent } from './components/screening/screening.component';
import { PathIntroComponent } from './components/path-intro/path-intro.component';
import { ThoughtLogComponent } from './components/thought-log/thought-log.component';
import { IdentifyThoughtsComponent } from './components/identify-thoughts/identify-thoughts.component';
import { ThoughtChallengeComponent } from './components/thought-challenge/thought-challenge.component';
import { authGuard } from './guards/auth.guard';

export const APP_ROUTES: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'screening', component: ScreeningComponent, canActivate: [authGuard] },
  { path: 'intro', component: PathIntroComponent, canActivate: [authGuard] },
  { path: 'log', component: ThoughtLogComponent, canActivate: [authGuard] },
  { path: 'identify', component: IdentifyThoughtsComponent, canActivate: [authGuard] },
  { path: 'challenge', component: ThoughtChallengeComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'screening', pathMatch: 'full' },
  { path: '**', redirectTo: 'screening' }
];
