import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandesListComponent } from '../../../components/admin/commandes-list/commandes-list.component';
import { SidebarComponent } from '../../../components/admin/sidebar/sidebar.component';
import { BoutiqueNavbarComponent } from '../../../components/admin/boutique-navbar/boutique-navbar.component';
import { FooterComponent } from '../../../components/admin/footer/footer.component';

@Component({
  selector: 'app-commandes-page',
  standalone: true,
  imports: [CommonModule, CommandesListComponent, SidebarComponent, BoutiqueNavbarComponent, FooterComponent],
  templateUrl: './commandes.page.html',
  styleUrls: ['./commandes.page.scss']
})
export class CommandesPageComponent {}