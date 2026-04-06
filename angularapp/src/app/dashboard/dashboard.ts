import { Component, AfterViewInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../layout/side-nav/side-nav';

import * as L from 'leaflet';

const locationIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SideNavComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements AfterViewInit {
  router = inject(Router);

  viewAssetDetails() {
    this.router.navigate(['/asset-insights']);
  }

  isSideNavOpen = true;

  assetSummary = [
    { nameLine1: 'Batching', nameLine2: 'Plant', count: 16, total: 40, icon: 'asset-icons/batching-plant.png' },
    { nameLine1: 'Tower', nameLine2: 'Crane', count: 9, total: 38, icon: 'asset-icons/tower-crane.jpg' },
    { nameLine1: 'Road', nameLine2: 'Roller', count: 10, total: 36, icon: 'asset-icons/road-roller.jpg' },
    { nameLine1: 'Wheel', nameLine2: 'Loader', count: 10, total: 44, icon: 'asset-icons/wheel-loader.png' },
    { nameLine1: 'Concrete', nameLine2: 'Pump', count: 12, total: 45, icon: 'asset-icons/concrete-pump.jpg' }
  ];

  sites = [
    { name: 'Chennai Plant', lat: 13.0827, lng: 80.2707 },
    { name: 'Mumbai Yard', lat: 19.0760, lng: 72.8777 },
    { name: 'Delhi Depot', lat: 28.7041, lng: 77.1025 }
  ];

  totalAssets = 97;

  private map!: L.Map;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
      this.map.invalidateSize();
    }, 0);
  }

  private initMap(): void {
    this.map = L.map('sitesMap', {
      center: [20.5937, 78.9629],
      zoom: 4
    });

    L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    {
      attribution: '© OpenStreetMap contributors © CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }
  ).addTo(this.map);

    this.sites.forEach(site => {
    L.marker([site.lat, site.lng], { icon: locationIcon })
      .addTo(this.map)
      .bindPopup(`<b>${site.name}</b>`);
  });
  }
}