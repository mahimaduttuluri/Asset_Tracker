import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, computed } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { SuperAdminMockService } from './mock.service';
import { SuperAdminOverview, ClientSummary } from './dashboard.model';
import { SuperAdminSideNavComponent } from './sidenav/superadmin-sidenav.component';

@Component({
  selector: 'app-superadmin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule,SuperAdminSideNavComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class SuperAdminDashboardComponent implements OnInit {

  isSideNavOpen = true;
  toggleSideNav() { this.isSideNavOpen = !this.isSideNavOpen; }

  loading = signal(false);
  errorMsg = signal('');

  activeTab = signal<'clients' | 'reports'>('clients');

  overview = signal<SuperAdminOverview>({
    lastUpdated: '',
    totalClients: 0,
    totalAssets: 0,
    statusSummary: { active: 0, noConnection: 0, notOperational: 0 },
    clients: []
  });

  // If you want username from login later, replace this
  userName = 'Super Admin';

  // Derived for UI (optional)
  hasClients = computed(() => this.overview().clients.length > 0);

  constructor(private mockApi: SuperAdminMockService, private router: Router) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading.set(true);
    this.errorMsg.set('');

    this.mockApi.getOverview()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: data => this.overview.set(data),
        error: () => this.errorMsg.set('Failed to load dashboard data.')
      });
  }

  openClientDetails(client: ClientSummary) {
    this.router.navigate(['/superadmin/clients', client.clientId]);
  }

  openAssetStatusReport() {
    this.router.navigate(['/superadmin/reports/asset-status']);
  }

  openUserDetailsReport() {
    this.router.navigate(['/superadmin/reports/user-details']);
  }

  goToMainDashboard() {
    this.router.navigate(['/dashboard']);
  }

  trackByClientId(_: number, item: ClientSummary) {
    return item.clientId;
  }
}
