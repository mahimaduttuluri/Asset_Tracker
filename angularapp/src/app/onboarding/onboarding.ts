import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../layout/side-nav/side-nav';
import { AssetTypeComponent } from '../Pages/asset-type/asset-type.component';
import { AssetOnboardingComponent } from '../Pages/asset-onboarding/asset-onboarding.component';
import { OEMOnboardComponent } from '../oem-onboarding/oem-onboard.component';

@Component({
  selector: 'app-onboarding',
  standalone: true,
imports: [CommonModule, SideNavComponent, AssetTypeComponent, AssetOnboardingComponent, OEMOnboardComponent],
  templateUrl: './onboarding.html',
  styleUrls: ['./onboarding.css']
})
export class OnboardingComponent {
  isSideNavOpen = true;
  activeTab = '';
  setTab(tab: string) {
    this.activeTab = tab;
  }
}
