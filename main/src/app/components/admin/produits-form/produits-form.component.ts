import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produits-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produits-form.component.html',
  styleUrls: ['./produits-form.component.scss']
})
export class ProduitsFormComponent {
  @Input() product: any = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  formData = {
    nom: '',
    categorie: '',
    sku: '',
    prix: '',
    stock: '',
    status: 'in-stock'
  };

  ngOnInit() {
    if (this.product) {
      this.formData = { ...this.product };
    }
  }

  submit() {
    this.save.emit(this.formData);
  }

  close() {
    this.cancel.emit();
  }
}
