import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
  private readonly document = inject(DOCUMENT) as Document;

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.document.documentElement.dataset['theme'] = 'dark';
    }
  }

  toggleTheme() {
    const html = this.document.documentElement as HTMLElement;
    const currentTheme = html.dataset['theme'];
    const newTheme = currentTheme === 'dark' ? '' : 'dark';
    html.dataset['theme'] = newTheme;
    localStorage.setItem('theme', newTheme);
  }

  getThemeIcon(): string {
    const html = this.document.documentElement as HTMLElement;
    const currentTheme = html.dataset['theme'];
    return currentTheme === 'dark' ? '☀️' : '🌙';
  }
}

