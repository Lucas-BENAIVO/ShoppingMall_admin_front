import { Component } from '@angular/core';
import { ProfileCardComponent } from '../../../components/admin/profile-card/profile-card.component';
import { SidebarComponent } from '../../../components/admin/sidebar/sidebar.component';
import { BoutiqueNavbarComponent } from '../../../components/admin/boutique-navbar/boutique-navbar.component';
import { FooterComponent } from '../../../components/admin/footer/footer.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileCardComponent, SidebarComponent, BoutiqueNavbarComponent, FooterComponent],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePageComponent {
  sidebarOpen = false;
  
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
  
  closeSidebar(): void {
    this.sidebarOpen = false;
  }
}
