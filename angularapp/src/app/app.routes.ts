import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { OnboardingComponent } from './onboarding/onboarding';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];