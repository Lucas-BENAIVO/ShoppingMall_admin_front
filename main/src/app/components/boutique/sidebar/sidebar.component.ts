import { Component } from '@angular/core';
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
export class SidebarComponent {
  menuItems = [
    {
      icon: 'home',
      label: 'Home',
      route: '/boutique',
      active: true
    },
    {
      icon: 'message',
      label: 'Message',
      route: '/boutique/messages',
      badge: 2,
      active: false
    },
    {
      icon: 'analytics',
      label: 'Analytics',
      route: '/boutique/analytics',
      active: false
    },
    {
      icon: 'receipt',
      label: 'Transaction',
      route: '/boutique/transactions',
      active: false
    },
    {
      icon: 'payment',
      label: 'Payment',
      route: '/boutique/payment',
      badge: 2,
      active: false
    }
  ];

  accountItems = [
    {
      icon: 'local_activity',
      label: 'Activity',
      route: '/boutique/activity',
      expandable: true,
      expanded: false,
      active: false,
      subItems: [
        { label: 'Balance', route: '/boutique/balance' },
        { label: 'Spending', route: '/boutique/spending' },
        { label: 'Refund', route: '/boutique/refund' }
      ]
    }
  ];

  settingsItems = [
    {
      icon: 'settings',
      label: 'Setting',
      route: '/boutique/settings',
      active: false
    },
    {
      icon: 'logout',
      label: 'Log out',
      route: '/authentication/login',
      active: false
    }
  ];

  toggleExpand(item: any) {
    item.expanded = !item.expanded;
  }

  setActive(item: any) {
    // Reset all menu items
    this.menuItems.forEach(m => m.active = false);
    this.accountItems.forEach(m => m.active = false);
    this.settingsItems.forEach(m => m.active = false);
    
    // Set the clicked item as active
    item.active = true;
  }
}
