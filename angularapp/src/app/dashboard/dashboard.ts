import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../layout/side-nav/side-nav';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SideNavComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  isDarkTheme = false;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.documentElement.setAttribute(
      'data-theme',
      this.isDarkTheme ? 'dark' : 'light'
    );
  }

  assetSummary = [
    { nameLine1: 'Batching', nameLine2: 'Plant', count: 16, total: 40, icon: 'asset-icons/batching-plant.png' },
    { nameLine1: 'Tower', nameLine2: 'Crane', count: 9, total: 38, icon: 'asset-icons/tower-crane.jpg' },
    { nameLine1: 'Road', nameLine2: 'Roller', count: 10, total: 36, icon: 'asset-icons/road-roller.jpg' },
    { nameLine1: 'Wheel', nameLine2: 'Loader', count: 10, total: 44, icon: 'asset-icons/wheel-loader.png' },
    { nameLine1: 'Concrete', nameLine2: 'Pump', count: 12, total: 45, icon: 'asset-icons/concrete-pump.jpg' }
  ];

  alerts = [
    { asset: 'Road Roller - 02540921', days: 23 },
    { asset: 'Wheel Loader - 01873211', days: 12 },
    { asset: 'Concrete Pump - 00987312', days: 5 }
  ];
}