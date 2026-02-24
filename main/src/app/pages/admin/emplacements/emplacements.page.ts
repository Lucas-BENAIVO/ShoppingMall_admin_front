import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/admin/sidebar/sidebar.component';
import { BoutiqueNavbarComponent } from '../../../components/admin/boutique-navbar/boutique-navbar.component';
import { FooterComponent } from '../../../components/admin/footer/footer.component';
import { EmplacementsComponent } from '../../../components/admin/emplacements/emplacements.component';

@Component({
  selector: 'app-emplacements-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent, BoutiqueNavbarComponent, FooterComponent, EmplacementsComponent],
  templateUrl: './emplacements.page.html',
  styleUrls: ['./emplacements.page.scss']
})
export class EmplacementsPage {}
