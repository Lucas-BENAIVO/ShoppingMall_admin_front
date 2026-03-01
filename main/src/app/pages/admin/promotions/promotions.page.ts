import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsListComponent } from '../../../components/admin/promotions-list/promotions-list.component';
import { SidebarComponent } from '../../../components/admin/sidebar/sidebar.component';
import { BoutiqueNavbarComponent } from '../../../components/admin/boutique-navbar/boutique-navbar.component';
import { FooterComponent } from '../../../components/admin/footer/footer.component';

@Component({
  selector: 'app-promotions-page',
  standalone: true,
  imports: [CommonModule, PromotionsListComponent, SidebarComponent, BoutiqueNavbarComponent, FooterComponent],
  templateUrl: './promotions.page.html',
  styleUrls: ['./promotions.page.scss']
})
export class PromotionsPageComponent {
  sidebarOpen = false;
  
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
  
  closeSidebar(): void {
    this.sidebarOpen = false;
  }
} 