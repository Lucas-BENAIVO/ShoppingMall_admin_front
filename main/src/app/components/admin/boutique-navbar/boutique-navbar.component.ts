import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boutique-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="boutique-navbar">
      <div class="navbar-left"></div>
      <div class="navbar-right">
        <button class="navbar-icon-btn">
          <span class="iconify" data-icon="solar:bell-bing-bold" style="font-size: 1.5em;"></span>
        </button>
        <div class="navbar-user">
          <span class="iconify" data-icon="solar:user-bold" style="font-size: 1.5em; color: #888;"></span>
          <span class="navbar-username">User name</span>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ['./boutique-navbar.component.scss']
})
export class BoutiqueNavbarComponent {}
