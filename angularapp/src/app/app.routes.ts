import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { OnboardingComponent } from './onboarding/onboarding';
import { AssetTypeComponent } from './Pages/asset-type/asset-type.component';
import { SuperAdminDashboardComponent } from './superadmin/dashboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'onboarding', component: OnboardingComponent },
{ path: 'asset-types', component: AssetTypeComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
{ path: 'superadmin/dashboard', component: SuperAdminDashboardComponent },

  //{ path: 'superadmin/clients/:clientId', loadComponent: () => import('./client-details/client-details.component').then(m => m.ClientDetailsComponent) },

  // optional placeholders
  //{ path: 'superadmin/reports/asset-status', loadComponent: () => import('./reports/asset-status-report.component').then(m => m.AssetStatusReportComponent) },
  //{ path: 'superadmin/reports/user-details', loadComponent: () => import('./reports/user-details-report.component').then(m => m.UserDetailsReportComponent) },

];
