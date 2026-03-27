import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { OnboardingComponent } from './onboarding/onboarding';
import { MockAssetInsightsComponent } from './mock-asset-insights/mock-asset-insights';
import { LiveTrackingMapComponent } from './live-tracking-map/live-tracking-map';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'onboarding', component: OnboardingComponent },

  { path: 'live-tracking', component: MockAssetInsightsComponent }, // temporary
  { path: 'live-tracking/:assetId', component: LiveTrackingMapComponent },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];