import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/admin/sidebar/sidebar.component';
import { BoutiqueNavbarComponent } from '../../../components/admin/boutique-navbar/boutique-navbar.component';
import { FooterComponent } from '../../../components/admin/footer/footer.component';
import { StockListComponent } from '../../../components/admin/stock-list/stock-list.component';

@Component({
  selector: 'app-gestion-stock-page',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    BoutiqueNavbarComponent,
    FooterComponent,
    StockListComponent
  ],
  templateUrl: './gestion-stock.page.html',
  styleUrls: ['./gestion-stock.page.scss']
})
export class GestionStockPage {
  sidebarOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }
}
