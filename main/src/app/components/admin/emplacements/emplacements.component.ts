
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmplacementFormComponent, Emplacement } from './emplacement-form.component';

@Component({
  selector: 'app-emplacements',
  standalone: true,
  imports: [CommonModule, EmplacementFormComponent],
  templateUrl: './emplacements.component.html',
  styleUrls: ['./emplacements.component.scss']
})
export class EmplacementsComponent {
  emplacements: Emplacement[] = [
    { id: 1, boutique: 'Elite Fashion Hub', position: 'A1', description: 'Entrée principale, à gauche' },
    { id: 2, boutique: 'Tech Paradise', position: 'B2', description: 'Près de la fontaine centrale' },
    { id: 3, boutique: 'Beauty Essentials', position: 'C3', description: 'Aile nord, 2ème étage' },
    { id: 4, boutique: 'Home Comfort Store', position: 'D4', description: 'Aile sud, rez-de-chaussée' },
    { id: 5, boutique: 'Sports Central', position: 'E5', description: 'Proche du parking extérieur' }
  ];

  showForm = false;
  editEmplacement: Emplacement | null = null;

  openAddForm() {
    this.editEmplacement = null;
    this.showForm = true;
  }

  openEditForm(emplacement: Emplacement) {
    this.editEmplacement = emplacement;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editEmplacement = null;
  }

  onSaveEmplacement(emplacement: Emplacement) {
    if (emplacement.id) {
      // Edition
      this.emplacements = this.emplacements.map(e => e.id === emplacement.id ? emplacement : e);
    } else {
      // Ajout
      const newId = Math.max(0, ...this.emplacements.map(e => e.id || 0)) + 1;
      this.emplacements = [...this.emplacements, { ...emplacement, id: newId }];
    }
    this.closeForm();
  }

  deleteEmplacement(id: number) {
    this.emplacements = this.emplacements.filter(e => e.id !== id);
  }
}
