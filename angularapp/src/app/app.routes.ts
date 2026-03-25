import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { OnboardingComponent } from './onboarding/onboarding';
import { AssetTypeComponent } from './Pages/asset-type/asset-type.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'onboarding', component: OnboardingComponent },
{ path: 'asset-types', component: AssetTypeComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];