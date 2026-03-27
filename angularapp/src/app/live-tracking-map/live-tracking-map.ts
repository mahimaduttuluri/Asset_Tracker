import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SideNavComponent } from '../layout/side-nav/side-nav';
import * as L from 'leaflet';

@Component({
  selector: 'app-live-tracking-map',
  standalone: true,
  imports: [SideNavComponent],
  templateUrl: './live-tracking-map.html',
  styleUrls: ['./live-tracking-map.css']
})
export class LiveTrackingMapComponent implements OnInit {
  assetId!: string;
  speed = 0;
  lastUpdated = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.assetId = this.route.snapshot.paramMap.get('assetId')!;
    this.initMap();
  }

  initMap() {
    const map = L.map('map').setView([12.9716, 77.5946], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);

    const marker = L.marker([12.9716, 77.5946]).addTo(map);

    // initialize immediately
    this.speed = 0;
    this.lastUpdated = new Date().toLocaleTimeString();

    setInterval(() => {
      const lat = 12.9716 + Math.random() * 0.001;
      const lng = 77.5946 + Math.random() * 0.001;

      marker.setLatLng([lat, lng]);
      map.panTo([lat, lng]);

      this.speed = Math.floor(Math.random() * 60);
      this.lastUpdated = new Date().toLocaleTimeString();
    }, 2000);
  }
}