import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminStatsService, TopBoutique } from '../../../services/admin-stats.service';

@Component({
  selector: 'app-top-shops',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-shops.component.html',
  styleUrls: ['./top-shops.component.scss']
})
export class TopShopsComponent implements OnInit {
  topShops: { rank: number; name: string; category: string; revenue: string; change: string }[] = [];
  isLoading = true;

  constructor(private adminStatsService: AdminStatsService) {}

  ngOnInit(): void {
    this.loadTopShops();
  }

  loadTopShops(): void {
    this.adminStatsService.getTopBoutiques().subscribe({
      next: (response) => {
        if (response.success) {
          this.topShops = response.data.map((shop, index) => ({
            rank: index + 1,
            name: shop.nom,
            category: `${shop.produits} produits vendus`,
            revenue: this.formatCurrency(shop.revenue),
            change: `${shop.commandes} cmd`
          }));
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-MG', { maximumFractionDigits: 0 }).format(amount) + ' Ar';
  }
}
