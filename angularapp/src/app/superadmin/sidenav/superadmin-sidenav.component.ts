import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-superadmin-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './superadmin-sidenav.component.html',
  styleUrls: ['./superadmin-sidenav.component.scss']
})
export class SuperAdminSideNavComponent {

  /** Controls visibility from parent */
  @Input() isOpen = true;

  /** Parent toggle function */
  @Input() toggle!: () => void;
}