import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommandesFormComponent } from '../commandes-form/commandes-form.component';

@Component({
  selector: 'app-commandes-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CommandesFormComponent],
  templateUrl: './commandes-list.component.html',
  styleUrls: ['./commandes-list.component.scss']
})
export class CommandesListComponent {
  showForm = false;
  editCommande: any = null;
  selectedStatus: string = '';

  commandes = [
    { id: 1, client: 'Lucas', date: '2026-02-22', total: 120, status: 'Livrée' },
    { id: 2, client: 'Marie', date: '2026-02-21', total: 80, status: 'En cours' },
    { id: 3, client: 'Ahmed', date: '2026-02-20', total: 45, status: 'Annulée' },
  ];

  get filteredCommandes() {
    if (!this.selectedStatus) return this.commandes;
    return this.commandes.filter(c =>
      c.status.toLowerCase() === this.selectedStatus.toLowerCase()
    );
  }

  openAddForm() {
    this.editCommande = null;
    this.showForm = true;
  }

  openEditForm(commande: any) {
    this.editCommande = { ...commande };
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editCommande = null;
  }

  deleteCommande(id: number) {
    this.commandes = this.commandes.filter(c => c.id !== id);
  }

  onSaveCommande(data: any) {
    if (this.editCommande?.id) {
      this.commandes = this.commandes.map(c =>
        c.id === this.editCommande.id ? { ...c, ...data } : c
      );
    } else {
      const newId = this.commandes.length
        ? Math.max(...this.commandes.map(c => c.id)) + 1
        : 1;
      this.commandes = [...this.commandes, { ...data, id: newId }];
    }
    this.closeForm();
  }
}