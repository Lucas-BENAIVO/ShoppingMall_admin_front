import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/admin/sidebar/sidebar.component';
import { BoutiqueNavbarComponent } from '../../../components/admin/boutique-navbar/boutique-navbar.component';
import { FooterComponent } from '../../../components/admin/footer/footer.component';
import { StatCardComponent } from '../../../components/admin/stat-card/stat-card.component';
import { TopShopsComponent } from '../../../components/admin/top-shops/top-shops.component';
import { CategoryDistributionComponent } from '../../../components/admin/category-distribution/category-distribution.component';
import { RecentUsersComponent } from '../../../components/admin/recent-users/recent-users.component';
import { AdminStatsService, GlobalStats } from '../../../services/admin-stats.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, BoutiqueNavbarComponent, FooterComponent, StatCardComponent, TopShopsComponent, CategoryDistributionComponent, RecentUsersComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sidebarOpen = false;
  
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
  }[] = [];
  
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
  
  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  constructor(private adminStatsService: AdminStatsService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.adminStatsService.getGlobalStats().subscribe({
      next: (response) => {
        if (response.success) {
          const data = response.data;
          this.stats = [
            {
              icon: 'payments',
              iconColor: '#6366f1',
              label: 'Revenu total',
              value: this.formatCurrency(data.commandes.revenue),
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
              value: data.commandes.total.toString(),
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
              value: data.utilisateurs.total.toString(),
              change: '+5%',
              changeType: 'positive',
              changeIcon: 'trending_up',
              actionLabel: 'Voir utilisateurs',
              actionColor: '#f59e42'
            },
            {
              icon: 'storefront',
              iconColor: '#3b82f6',
              label: 'Boutiques',
              value: data.boutiques.total.toString(),
              change: data.boutiques.enAttente > 0 ? `${data.boutiques.enAttente} en attente` : 'Toutes validées',
              changeType: data.boutiques.enAttente > 0 ? 'neutral' : 'positive',
              changeIcon: data.boutiques.enAttente > 0 ? 'pending' : 'check_circle',
              actionLabel: 'Voir boutiques',
              actionColor: '#3b82f6'
            }
          ];
        }
      },
      error: (err) => {
        console.error('Erreur chargement stats:', err);
      }
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-MG', { maximumFractionDigits: 0 }).format(amount) + ' Ar';
  }
}