import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../layout/side-nav/side-nav';

@Component({
  selector: 'app-mock-asset-insights',
  standalone: true,
  imports: [CommonModule, SideNavComponent],
  templateUrl: './mock-asset-insights.html',
  styleUrls: ['./mock-asset-insights.css']
})
export class MockAssetInsightsComponent {
  
  constructor(private router: Router) {}

  assets = [
    {
      assetId: 'TRK-001',
      assetType: 'Truck',
      status: 'Active',
      speed: 45,
      lastUpdated: '2 seconds ago'
    },
    {
      assetId: 'BIKE-023',
      assetType: 'Bike',
      status: 'Idle',
      speed: 0,
      lastUpdated: '12 seconds ago'
    },
    {
      assetId: 'VAN-110',
      assetType: 'Van',
      status: 'Active',
      speed: 36,
      lastUpdated: '5 seconds ago'
    }
  ];

   trackLive(assetId: string) {
    this.router.navigate(['/live-tracking', assetId]);
  }

}