import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  selector: 'app-live-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, SideNavComponent],
  templateUrl: './live-tracking.html',
  styleUrls: ['./live-tracking.css']
})
export class LiveTracking implements OnInit {
  isSideNavOpen = true;

  assetId = '';
  currentSpeed = 0;
  currentLat = 0;
  currentLng = 0;
  map: any;
  marker: any;

  private mockData: { [key: string]: { lat: number, lng: number, speed: number } } = {
    'AST001': { lat: 13.0827, lng: 80.2707, speed: 25 },
    'AST002': { lat: 19.0760, lng: 72.8777, speed: 12 },
    'AST003': { lat: 28.6139, lng: 77.2090, speed: 45 },
    'AST004': { lat: 13.0827, lng: 80.2707, speed: 8 }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.assetId = this.route.snapshot.paramMap.get('assetId') || '';
    const data = this.mockData[this.assetId] || { lat: 0, lng: 0, speed: 0 };
    this.currentLat = data.lat;
    this.currentLng = data.lng;
    this.currentSpeed = data.speed;

    // Simulate live updates
    setInterval(() => {
      this.currentSpeed = Math.max(0, this.currentSpeed + (Math.random() - 0.5) * 20);
      this.currentLat += (Math.random() - 0.5) * 0.001;
      this.currentLng += (Math.random() - 0.5) * 0.001;
      this.updateMap();
    }, 2000);

    setTimeout(() => this.initMap(), 100);
  }

  initMap() {
    this.map = window.L.map('map').setView([this.currentLat, this.currentLng], 15);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    this.marker = window.L.marker([this.currentLat, this.currentLng], { icon: locationIcon }).addTo(this.map)
      .bindPopup(`Asset ${this.assetId}<br>Speed: ${this.currentSpeed.toFixed(1)} km/h`);
    this.map.fitBounds(this.marker.getBounds());
  }

  updateMap() {
    if (this.map && this.marker) {
      this.marker.setLatLng([this.currentLat, this.currentLng]);
      this.marker.getPopup()?.setContent(`Asset ${this.assetId}<br>Speed: ${this.currentSpeed.toFixed(1)} km/h`);
      this.marker.openPopup();
      this.map.panTo([this.currentLat, this.currentLng]);
      this.map.invalidateSize();
    }
  }
}
