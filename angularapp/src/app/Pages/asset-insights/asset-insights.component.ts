import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  signal,
  HostListener,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

type AssetStatus =
  | 'Active'
  | 'Not Operating'
  | 'Idle'
  | 'Not Reporting'
  | 'Surplus'
  | 'Breakdown';

type OwnershipFilter = 'All' | 'Hired' | 'Owned';

export interface AssetInsightItem {
  id: string;
  name: string;
  ownership: 'Hired' | 'Owned';
  status: AssetStatus;
  critical: boolean;

  avgUtilisationPct: number;
  avgProductivityPct: number;
  idleHours: number;

  location?: string;
  lastReported?: string; // e.g., "2 mins ago" (optional)
  starred?: boolean;
  pinned?: boolean;
}

@Component({
  selector: 'app-asset-insights',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asset-insights.component.html',
  styleUrls: ['./asset-insights.component.scss'],
})
export class AssetInsightsComponent {
  @Input() assets: AssetInsightItem[] = this.mockAssets();
  @Output() viewDetails = new EventEmitter<AssetInsightItem>();

  // Filters
  ownership = signal<OwnershipFilter>('All');
  onlyCritical = signal(false);
  search = signal('');

  // Drawer state
  selectedAsset = signal<AssetInsightItem | null>(null);
  drawerOpen = computed(() => !!this.selectedAsset());

  // Optional: used if you want to lock scroll later (kept simple now)
  private document = inject(DOCUMENT);

  filteredAssets = computed(() => {
    const q = this.search().toLowerCase().trim();
    return this.assets
      .filter(a => this.ownership() === 'All' || a.ownership === this.ownership())
      .filter(a => !this.onlyCritical() || a.critical)
      .filter(a =>
        !q ||
        a.id.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q) ||
        a.status.toLowerCase().includes(q)
      );
  });

  siteCount = computed(() => this.filteredAssets().length);

  // Drawer open from card/button
  openDrawer(asset: AssetInsightItem) {
    this.selectedAsset.set(asset);
    this.viewDetails.emit(asset);
  }

  closeDrawer() {
    this.selectedAsset.set(null);
  }

  // Close on ESC
  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.drawerOpen()) this.closeDrawer();
  }

  toggleStar(a: AssetInsightItem) {
    a.starred = !a.starred;
  }

  togglePin(a: AssetInsightItem) {
    a.pinned = !a.pinned;
  }

  statusClass(status: AssetStatus) {
    if (status === 'Active') return 'good';
    if (status === 'Idle' || status === 'Not Operating') return 'warn';
    return 'danger';
  }

  clampPct(n: number) {
    return Math.max(0, Math.min(100, Math.round(n)));
  }

  private mockAssets(): AssetInsightItem[] {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: `13250${i + 1}H`,
      name: 'Mobile concrete batching plant',
      ownership: i % 3 === 0 ? 'Owned' : 'Hired',
      status:
        i % 6 === 0
          ? 'Breakdown'
          : i % 5 === 0
          ? 'Not Reporting'
          : i % 4 === 0
          ? 'Idle'
          : 'Active',
      critical: i % 4 === 0,
      avgUtilisationPct: 78 + (i % 5) * 3,
      avgProductivityPct: 80 + (i % 4) * 4,
      idleHours: +(0.8 + i * 0.2).toFixed(1),
      location: i % 2 === 0 ? 'Site A - Zone 2' : 'Site B - Zone 1',
      lastReported: i % 5 === 0 ? '12 mins ago' : '2 mins ago',
    }));
  }
}