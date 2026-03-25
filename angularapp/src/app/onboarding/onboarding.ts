import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../layout/side-nav/side-nav';
import { AssetTypeComponent } from '../Pages/asset-type/asset-type.component';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, SideNavComponent, AssetTypeComponent],
  templateUrl: './onboarding.html',
  styleUrls: ['./onboarding.css']
})
export class OnboardingComponent {
  activeTab = 'oem';
  setTab(tab: string) {
    this.activeTab = tab;
  }
}
