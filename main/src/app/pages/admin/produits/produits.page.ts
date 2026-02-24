import { Component } from '@angular/core';
import { ProduitsListComponent } from '../../../components/admin/produits-list/produits-list.component';
import { SidebarComponent } from '../../../components/admin/sidebar/sidebar.component';
import { BoutiqueNavbarComponent } from '../../../components/admin/boutique-navbar/boutique-navbar.component';
import { FooterComponent } from '../../../components/admin/footer/footer.component';

@Component({
  selector: 'app-produits-page',
  standalone: true,
  templateUrl: './produits.page.html',
  styleUrls: ['./produits.page.scss']
  ,
  imports: [ProduitsListComponent, SidebarComponent, BoutiqueNavbarComponent, FooterComponent]
})
export class ProduitsPage {}
