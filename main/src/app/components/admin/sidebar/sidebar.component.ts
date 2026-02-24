import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems = [
    {
      icon: 'home',
      label: 'Tableau de bord',
      route: '/admin/dashboard',
      active: true
    },
    {
      icon: 'storefront',
      label: 'Boutique',
      route: '/admin/boutique',
      active: false
    },
    {
      icon: 'inventory_2',
      label: 'Produits',
      route: '/admin/produits',
      active: false
    },
    {
      icon: 'shopping_cart',
      label: 'Commandes',
      route: '/admin/commandes',
      active: false
    },
    {
      icon: 'groups',
      label: 'Utilisateurs',
      route: '/admin/utilisateurs',
      active: false
    },
    {
      icon: 'tune',
      label: 'Configuration',
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

  accountItems = [
    {
      icon: 'warehouse',
      label: 'Gestion de stock',
      route: '/admin/stock',
      expandable: true,
      expanded: false,
      active: false,
      subItems: [
        { label: 'Inventaire', route: '/admin/inventaire' },
        { label: 'Dépenses', route: '/admin/depenses' },
        { label: 'Remboursement', route: '/admin/remboursement' }
      ]
    }
  ];

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
      route: '/authentication/login',
      active: false
    }
  ];

  constructor(private router: Router) {}

  toggleExpand(item: any): void {
    item.expanded = !item.expanded;
  }

  setActive(item: any): void {
    this.resetActive();
    item.active = true;
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
