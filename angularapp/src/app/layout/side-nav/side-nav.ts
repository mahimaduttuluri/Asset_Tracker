import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-nav.html',
  styleUrls: ['./side-nav.css']
})
export class SideNavComponent {
  isSideNavOpen = true;
  @Output() isOpenChange = new EventEmitter<boolean>();
  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
    this.isOpenChange.emit(this.isSideNavOpen);
  }
}