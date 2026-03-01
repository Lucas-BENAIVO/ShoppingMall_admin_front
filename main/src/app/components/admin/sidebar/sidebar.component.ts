import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();
  
  @HostBinding('class.open') get openClass() { return this.isOpen; }
  menuItems = [
    {
      icon: 'home',
      label: 'Tableau de bord',
      route: '/admin/dashboard',
      active: true
    },
    {
      icon: 'groups',
      label: 'Utilisateurs',
      route: '/admin/utilisateurs',
      active: false
    },
    {
      icon: 'storefront',
      label: 'Boutique',
      route: '/admin/boutique',
      active: false
    },
    {
      icon: 'local_offer',
      label: 'Promotions',
      route: '/admin/promotions',
      active: false
    },
    {
      icon: 'map',
      label: 'Emplacements',
      route: '/admin/emplacements',
      active: false
    }
  ];

  accountItems: any[] = [];

  settingsItems = [
    {
      icon: 'settings',
      label: 'Paramètres',  
      route: '/admin/profile',
      active: false
    },
    {
      icon: 'logout',
      label: 'Déconnexion',
      route: null,
      active: false,
      action: 'logout'
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/authentication/login']);
  }

  toggleExpand(item: any): void {
    item.expanded = !item.expanded;
  }

  setActive(item: any): void {
    this.resetActive();
    item.active = true;
    // Close sidebar on mobile after selection
    this.closeSidebar.emit();
  }
  
  close(): void {
    this.closeSidebar.emit();
  }

  resetActive(): void {
    this.menuItems.forEach((m: any) => m.active = false);
    this.accountItems.forEach((m: any) => m.active = false);
    this.settingsItems.forEach((m: any) => m.active = false);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveByRoute(event.urlAfterRedirects);
      }
    });
    // Initial activation
    this.updateActiveByRoute(this.router.url);
  }

  updateActiveByRoute(url: string): void {
    this.resetActive();
    // Menu principal
    this.menuItems.forEach((item: any) => {
      if (url.startsWith(item.route)) {
        item.active = true;
      }
    });
    // Gestion de stock
    this.accountItems.forEach((item: any) => {
      if (url.startsWith(item.route)) {
        item.active = true;
      }
      if (item.subItems) {
        item.subItems.forEach((sub: any) => {
          if (url.startsWith(sub.route)) {
            item.active = true;
            item.expanded = true;
          }
        });
      }
    });
    // Paramètres
    this.settingsItems.forEach((item: any) => {
      if (url.startsWith(item.route)) {
        item.active = true;
      }
    });
  }
}
