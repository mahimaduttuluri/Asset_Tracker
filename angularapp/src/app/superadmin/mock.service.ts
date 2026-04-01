import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ClientSummary, SuperAdminOverview } from './dashboard.model';

@Injectable({ providedIn: 'root' })
export class SuperAdminMockService {

  private clients: ClientSummary[] = [
    {
      clientId: 'C001',
      clientName: 'L&T Energy',
      clientGroup: 'L&T Power',
      jobs: 11,
      assets: 42,
      active: 0,
      noConnection: 35,
      notOperational: 7
    },
    {
      clientId: 'C002',
      clientName: 'L&T Hydrocarbon Engineering',
      clientGroup: 'L&T Hydrocarbon',
      jobs: 3,
      assets: 7,
      active: 0,
      noConnection: 7,
      notOperational: 0
    }
  ];

  getOverview(): Observable<SuperAdminOverview> {
    const totalClients = this.clients.length;
    const totalAssets = this.clients.reduce((sum, c) => sum + c.assets, 0);

    const statusSummary = this.clients.reduce(
      (acc, c) => {
        acc.active += c.active;
        acc.noConnection += c.noConnection;
        acc.notOperational += c.notOperational;
        return acc;
      },
      { active: 0, noConnection: 0, notOperational: 0 }
    );

    const overview: SuperAdminOverview = {
      lastUpdated: this.formatDateTime(new Date()),
      totalClients,
      totalAssets,
      statusSummary,
      clients: this.clients
    };

    return of(overview).pipe(delay(500)); // simulate loading
  }

  getClientById(clientId: string): Observable<ClientSummary | undefined> {
    return of(this.clients.find(c => c.clientId === clientId)).pipe(delay(250));
  }

  private formatDateTime(d: Date): string {
    // Example: 14-Nov-2025 04:40 PM style
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const dd = String(d.getDate()).padStart(2, '0');
    const mon = months[d.getMonth()];
    const yyyy = d.getFullYear();

    let hh = d.getHours();
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ampm = hh >= 12 ? 'PM' : 'AM';
    hh = hh % 12 || 12;
    const HH = String(hh).padStart(2, '0');

    return `${dd}-${mon}-${yyyy} ${HH}:${mm} ${ampm}`;
  }
}