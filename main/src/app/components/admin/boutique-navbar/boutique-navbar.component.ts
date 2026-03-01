import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../../services/auth.service';

@Component({
  selector: 'app-boutique-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="boutique-navbar">
      <div class="navbar-left">
        <button class="mobile-menu-btn" (click)="toggleMenu()">
          <span class="iconify" data-icon="solar:hamburger-menu-linear" style="font-size: 1.5em;"></span>
        </button>
      </div>
      <div class="navbar-right">
        <button class="navbar-icon-btn">
          <span class="iconify" data-icon="solar:bell-bing-bold" style="font-size: 1.5em;"></span>
        </button>
        <div class="navbar-user">
          <span class="iconify" data-icon="solar:user-bold" style="font-size: 1.5em; color: #888;"></span>
          <span class="navbar-username">{{ currentUser?.fullName || 'Admin' }}</span>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ['./boutique-navbar.component.scss']
})
export class BoutiqueNavbarComponent implements OnInit {
  currentUser: User | null = null;
  
  @Output() menuToggle = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }
  
  toggleMenu() {
    this.menuToggle.emit();
  }
}
