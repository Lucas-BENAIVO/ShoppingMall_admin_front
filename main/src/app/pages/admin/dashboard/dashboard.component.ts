import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/admin/sidebar/sidebar.component';
import { BoutiqueNavbarComponent } from '../../../components/admin/boutique-navbar/boutique-navbar.component';
import { FooterComponent } from '../../../components/admin/footer/footer.component';
import { StatCardComponent } from '../../../components/admin/stat-card/stat-card.component';
import { TopShopsComponent } from '../../../components/admin/top-shops/top-shops.component';
import { CategoryDistributionComponent } from '../../../components/admin/category-distribution/category-distribution.component';
import { RecentUsersComponent } from '../../../components/admin/recent-users/recent-users.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, BoutiqueNavbarComponent, FooterComponent, StatCardComponent, TopShopsComponent, CategoryDistributionComponent, RecentUsersComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  stats: {
    icon: string;
    iconColor: string;
    label: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
    changeIcon: string;
    actionLabel: string;
    actionColor: string;
  }[] = [
    {
      icon: 'payments',
      iconColor: '#6366f1',
      label: 'Revenu total',
      value: '1 250 000 €',
      change: '+12%',
      changeType: 'positive',
      changeIcon: 'trending_up',
      actionLabel: 'Voir détails',
      actionColor: '#6366f1'
    },
    {
      icon: 'shopping_cart',
      iconColor: '#22c55e',
      label: 'Commandes totales',
      value: '8 420',
      change: '+8%',
      changeType: 'positive',
      changeIcon: 'trending_up',
      actionLabel: 'Voir commandes',
      actionColor: '#22c55e'
    },
    {
      icon: 'groups',
      iconColor: '#f59e42',
      label: 'Utilisateurs',
      value: '2 310',
      change: '+5%',
      changeType: 'positive',
      changeIcon: 'trending_up',
      actionLabel: 'Voir utilisateurs',
      actionColor: '#f59e42'
    },
    {
      icon: 'local_offer',
      iconColor: '#f43f5e',
      label: 'Promotions actives',
      value: '14',
      change: '-2%',
      changeType: 'negative',
      changeIcon: 'trending_down',
      actionLabel: 'Voir promotions',
      actionColor: '#f43f5e'
    }
  ];
}