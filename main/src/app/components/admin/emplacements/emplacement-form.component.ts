import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Emplacement {
  id?: number;
  boutique: string;
  position: string;
  description: string;
}

@Component({
  selector: 'app-emplacement-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './emplacement-form.component.html',
  styleUrls: ['./emplacement-form.component.scss']
})
export class EmplacementFormComponent {
  @Input() emplacement: Emplacement | null = null;
  @Output() save = new EventEmitter<Emplacement>();
  @Output() cancel = new EventEmitter<void>();

  form: Emplacement = { boutique: '', position: '', description: '' };

  ngOnInit() {
    if (this.emplacement) {
      this.form = { ...this.emplacement };
    }
  }

  onSubmit() {
    this.save.emit(this.form);
  }

  onCancel() {
    this.cancel.emit();
  }
}
