import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-distribution',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-distribution.component.html',
  styleUrls: ['./category-distribution.component.scss']
})
export class CategoryDistributionComponent {
  categories = [
    { name: 'Mode & Accessoires', count: 42, color: '#6366f1' },
    { name: 'Électronique & Tech', count: 36, color: '#0ea5e9' },
    { name: 'Maison & Vie', count: 28, color: '#22c55e' },
    { name: 'Beauté & Santé', count: 19, color: '#f59e42' },
    { name: 'Sports & Plein air', count: 12, color: '#f43f5e' },
    { name: 'Autres catégories', count: 6, color: '#aab0c8' }
  ];
  get total() {
    return this.categories.reduce((sum, c) => sum + c.count, 0);
  }
}
