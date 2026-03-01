import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminStatsService } from '../../../services/admin-stats.service';

@Component({
  selector: 'app-category-distribution',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-distribution.component.html',
  styleUrls: ['./category-distribution.component.scss']
})
export class CategoryDistributionComponent implements OnInit {
  categories: { name: string; count: number; color: string }[] = [];
  isLoading = true;

  private colors = ['#6366f1', '#0ea5e9', '#22c55e', '#f59e42', '#f43f5e', '#aab0c8', '#8b5cf6', '#14b8a6'];

  constructor(private adminStatsService: AdminStatsService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.adminStatsService.getCategoriesDistribution().subscribe({
      next: (response) => {
        if (response.success) {
          this.categories = response.data.map((cat, index) => ({
            name: cat.nom,
            count: cat.count,
            color: this.colors[index % this.colors.length]
          }));
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  get total() {
    return this.categories.reduce((sum, c) => sum + c.count, 0);
  }
}
