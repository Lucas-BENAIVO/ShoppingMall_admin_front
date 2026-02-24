import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users = [
    { id: 1, nom: 'Alice', email: 'alice@email.com', role: 'Admin' },
    { id: 2, nom: 'Bob', email: 'bob@email.com', role: 'Utilisateur' },
    { id: 3, nom: 'Charlie', email: 'charlie@email.com', role: 'Utilisateur' }
  ];

  selectedRole: string = '';
  selectedUser: any = null;
  showModal = false;

  formData = {
    nom: '',
    email: '',
    role: 'Utilisateur'
  };

  get filteredUsers() {
    if (!this.selectedRole) return this.users;
    return this.users.filter(u => u.role === this.selectedRole);
  }

  openAddModal() {
    this.selectedUser = null;
    this.formData = { nom: '', email: '', role: 'Utilisateur' };
    this.showModal = true;
  }

  openEditModal(user: any) {
    this.selectedUser = { ...user };
    this.formData = { nom: user.nom, email: user.email, role: user.role };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedUser = null;
  }

  saveUser() {
    if (this.selectedUser?.id) {
      this.users = this.users.map(u =>
        u.id === this.selectedUser.id ? { ...u, ...this.formData } : u
      );
    } else {
      const newId = this.users.length
        ? Math.max(...this.users.map(u => u.id)) + 1
        : 1;
      this.users = [...this.users, { ...this.formData, id: newId }];
    }
    this.closeModal();
  }

  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
  }
}