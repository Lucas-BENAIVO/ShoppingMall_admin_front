import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoutiqueListComponent } from '../../../components/admin/boutique/boutique-list.component';
import { SidebarComponent } from '../../../components/admin/sidebar/sidebar.component';
import { FooterComponent } from '../../../components/admin/footer/footer.component';
import { BoutiqueNavbarComponent } from '../../../components/admin/boutique-navbar/boutique-navbar.component';

@Component({
  selector: 'app-boutique-page',
  standalone: true,
  imports: [CommonModule, BoutiqueListComponent, SidebarComponent, BoutiqueNavbarComponent, FooterComponent],
  templateUrl: './boutique.page.html',
  styleUrls: ['./boutique.page.scss']
})
export class BoutiquePage {
  sidebarOpen = false;
  
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
  
  closeSidebar(): void {
    this.sidebarOpen = false;
  }
}