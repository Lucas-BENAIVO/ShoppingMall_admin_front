import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromotionsFormComponent } from '../promotions-form/promotions-form.component';

@Component({
  selector: 'app-promotions-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PromotionsFormComponent],
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.scss']
})
export class PromotionsListComponent {
  showForm = false;
  editPromotion: any = null;
  selectedType: string = '';

  promotions = [
    { id: 1, type: 'Code promo', nom: 'WELCOME10', valeur: '10%', statut: 'Actif' },
    { id: 2, type: 'Carte fidélité', nom: 'Gold Card', valeur: '5€', statut: 'Inactif' },
    { id: 3, type: 'Code promo', nom: 'SUMMER20', valeur: '20%', statut: 'Expiré' },
    { id: 4, type: 'Promotion globale', nom: 'Black Friday', valeur: '30%', statut: 'Actif' },
    { id: 5, type: 'Promotion globale', nom: 'Soldes d’hiver', valeur: '15%', statut: 'Actif' },
  ];

  get filteredPromotions() {
    if (!this.selectedType) return this.promotions;
    return this.promotions.filter(p => p.type === this.selectedType);
  }

  openAddForm() {
    this.editPromotion = null;
    this.showForm = true;
  }

  openEditForm(promotion: any) {
    this.editPromotion = { ...promotion };
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editPromotion = null;
  }

  deletePromotion(id: number) {
    this.promotions = this.promotions.filter(p => p.id !== id);
  }

  onSavePromotion(data: any) {
    if (this.editPromotion?.id) {
      this.promotions = this.promotions.map(p =>
        p.id === this.editPromotion.id ? { ...p, ...data } : p
      );
    } else {
      const newId = this.promotions.length
        ? Math.max(...this.promotions.map(p => p.id)) + 1
        : 1;
      this.promotions = [...this.promotions, { ...data, id: newId }];
    }
    this.closeForm();
  }
}