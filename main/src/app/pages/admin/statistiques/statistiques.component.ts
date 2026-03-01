import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopProduitsComponent } from '../../../components/admin/top-produits/top-produits.component';
import { VentesParJourComponent } from '../../../components/admin/ventes-par-jour/ventes-par-jour.component';
import { TopClientsComponent } from '../../../components/admin/top-clients/top-clients.component';
import { SidebarComponent } from '../../../components/admin/sidebar/sidebar.component';
import { BoutiqueNavbarComponent } from '../../../components/admin/boutique-navbar/boutique-navbar.component';
import { FooterComponent } from '../../../components/admin/footer/footer.component';

@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [CommonModule, TopProduitsComponent, VentesParJourComponent, TopClientsComponent, SidebarComponent, BoutiqueNavbarComponent, FooterComponent],
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent {
  sidebarOpen = false;
  
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
  
  closeSidebar(): void {
    this.sidebarOpen = false;
  }
}
