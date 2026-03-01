import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../../../components/admin/user-list/user-list.component';
import { FooterComponent } from '../../../components/admin/footer/footer.component';
import { SidebarComponent } from '../../../components/admin/sidebar/sidebar.component';
import { BoutiqueNavbarComponent } from '../../../components/admin/boutique-navbar/boutique-navbar.component';

@Component({
  selector: 'app-utilisateurs-page',
  standalone: true,
  imports: [CommonModule, UserListComponent, SidebarComponent, FooterComponent, BoutiqueNavbarComponent],
  templateUrl: './utilisateurs.page.html',
  styleUrls: ['./utilisateurs.page.scss']
})
export class UtilisateursPage {
  sidebarOpen = false;
  
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
  
  closeSidebar(): void {
    this.sidebarOpen = false;
  }
}