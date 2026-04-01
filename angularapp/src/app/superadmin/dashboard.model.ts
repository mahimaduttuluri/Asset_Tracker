export interface StatusSummary {
  active: number;
  noConnection: number;
  notOperational: number;
}

export interface ClientSummary {
  clientId: string;
  clientName: string;     // L&T Energy
  clientGroup: string;    // L&T Power
  jobs: number;           // Jobs/Sites count
  assets: number;
  active: number;
  noConnection: number;
  notOperational: number; // included for your "assets, active, no connection" + not operational
}

export interface SuperAdminOverview {
  lastUpdated: string; // display string
  totalClients: number;
  totalAssets: number;
  statusSummary: StatusSummary;
  clients: ClientSummary[];
}