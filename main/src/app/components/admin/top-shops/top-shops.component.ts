import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-shops',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-shops.component.html',
  styleUrls: ['./top-shops.component.scss']
})
export class TopShopsComponent {
  topShops = [
    { rank: 1, name: 'Elite Fashion Hub', category: 'Mode & Accessoires', revenue: '$48,200', change: '+32%' },
    { rank: 2, name: 'Tech Paradise', category: 'Électronique', revenue: '$42,800', change: '+28%' },
    { rank: 3, name: 'Beauty Essentials', category: 'Beauté & Santé', revenue: '$38,500', change: '+24%' },
    { rank: 4, name: 'Home Comfort Store', category: 'Maison & Vie', revenue: '$32,900', change: '+20%' },
    { rank: 5, name: 'Sports Central', category: 'Sports & Plein air', revenue: '$29,400', change: '+15%' }
  ];
}
