import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-promotions-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './promotions-form.component.html',
  styleUrls: ['./promotions-form.component.scss']
})
export class PromotionsFormComponent implements OnInit, OnChanges {
  @Input() promotion: any = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  formData = {
    type: 'Code promo',
    nom: '',
    valeur: '',
    statut: 'Actif'
  };

  ngOnInit() {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['promotion']) {
      this.loadData();
    }
  }

  loadData() {
    if (this.promotion) {
      this.formData = { ...this.promotion };
    } else {
      this.formData = {
        type: 'Code promo',
        nom: '',
        valeur: '',
        statut: 'Actif'
      };
    }
  }

  submit() {
    this.save.emit({ ...this.formData });
  }

  close() {
    this.cancel.emit();
  }
}