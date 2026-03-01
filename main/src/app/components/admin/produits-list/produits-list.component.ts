import { Component } from '@angular/core';
import { ProduitsFormComponent } from '../produits-form/produits-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produits-list',
  standalone: true,
  templateUrl: './produits-list.component.html',
  styleUrls: ['./produits-list.component.scss']
  ,
  imports: [CommonModule, ProduitsFormComponent]
})
export class ProduitsListComponent {
  showForm = false;
  editProduct: any = null;

  openAddForm() {
    this.editProduct = null;
    this.showForm = true;
  }

  openEditForm(product: any) {
    this.editProduct = product;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editProduct = null;
  }
}
