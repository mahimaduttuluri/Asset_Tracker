import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SideNavComponent } from '../../layout/side-nav/side-nav';

@Component({
  selector: 'app-asset-insights',
  standalone: true,
  imports: [CommonModule, SideNavComponent, FormsModule],
  templateUrl: './asset-insights.component.html',
  styleUrls: ['./asset-insights.component.css'],
})
export class AssetInsightsComponent {

  isSideNavOpen = true;

  // ✅ View toggle
  viewMode: 'card' | 'table' = 'card';

  // ✅ Filters
  selectedSite = 'All';
  selectedAssetType = 'All';

  sites = ['All', 'Chennai', 'Mumbai', 'Delhi'];
  assetTypes = ['All', 'Batching Plant', 'Crane', 'Loader'];

  // ✅ Mock Asset Data
  assets = [
    { id: 'AST001', site: 'Chennai', type: 'Crane', status: 'Active' },
    { id: 'AST002', site: 'Mumbai', type: 'Batching Plant', status: 'Idle' },
    { id: 'AST003', site: 'Delhi', type: 'Loader', status: 'Not Reporting' },
    { id: 'AST004', site: 'Chennai', type: 'Crane', status: 'Active' },
  ];

  // ✅ Filtered Assets
  get filteredAssets() {
    return this.assets.filter(asset =>
      (this.selectedSite === 'All' || asset.site === this.selectedSite) &&
      (this.selectedAssetType === 'All' || asset.type === this.selectedAssetType)
    );
  }
}