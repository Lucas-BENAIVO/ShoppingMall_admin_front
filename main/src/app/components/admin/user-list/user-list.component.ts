import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, UserData } from '../../../services/user.service';

interface UserDisplay {
  _id: string;
  nom: string;
  email: string;
  role: string;
  phone: string;
  createdAt: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: UserDisplay[] = [];
  filteredUsers: UserDisplay[] = [];
  paginatedUsers: UserDisplay[] = [];
  loading = true;

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  // Filtres
  searchQuery = '';
  selectedRole = 'all';
  sortBy = 'date-desc';

  // Modal
  selectedUser: UserDisplay | null = null;
  showModal = false;
  showDeleteModal = false;
  isEditing = false;

  formData = {
    nom: '',
    email: '',
    role: 'USER',
    phone: '',
    password: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.users = response.data.map(u => ({
            _id: u._id,
            nom: u.fullName,
            email: u.email,
            role: u.role,
            phone: u.phone || '',
            createdAt: u.createdAt
          }));
          this.applyFilters();
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement utilisateurs:', err);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let result = [...this.users];

    // Filtre recherche
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(u =>
        u.nom.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query)
      );
    }

    // Filtre rôle
    if (this.selectedRole !== 'all') {
      result = result.filter(u => u.role === this.selectedRole);
    }

    // Tri
    switch (this.sortBy) {
      case 'date-desc':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'name-asc':
        result.sort((a, b) => a.nom.localeCompare(b.nom));
        break;
      case 'name-desc':
        result.sort((a, b) => b.nom.localeCompare(a.nom));
        break;
    }

    this.filteredUsers = result;
    this.totalPages = Math.ceil(result.length / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedUsers();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  getRoleLabel(role: string): string {
    const roles: { [key: string]: string } = {
      'USER': 'Utilisateur',
      'MANAGER': 'Propriétaire',
      'ADMIN_CENTRE': 'Administrateur'
    };
    return roles[role] || role;
  }

  openAddModal(): void {
    this.selectedUser = null;
    this.isEditing = false;
    this.formData = { nom: '', email: '', role: 'USER', phone: '', password: '' };
    this.showModal = true;
  }

  openEditModal(user: UserDisplay): void {
    this.selectedUser = user;
    this.isEditing = true;
    this.formData = {
      nom: user.nom,
      email: user.email,
      role: user.role,
      phone: user.phone,
      password: ''
    };
    this.showModal = true;
  }

  confirmDelete(user: UserDisplay): void {
    this.selectedUser = user;
    this.showDeleteModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.showDeleteModal = false;
    this.selectedUser = null;
  }

  saveUser(): void {
    const userData: any = {
      fullName: this.formData.nom,
      email: this.formData.email,
      role: this.formData.role,
      phone: this.formData.phone
    };

    if (this.formData.password) {
      userData.password = this.formData.password;
    }

    if (this.isEditing && this.selectedUser) {
      this.userService.updateUser(this.selectedUser._id, userData).subscribe({
        next: () => {
          this.loadUsers();
          this.closeModal();
        },
        error: (err) => {
          console.error('Erreur mise à jour:', err);
          alert('Erreur lors de la mise à jour');
        }
      });
    } else {
      if (!this.formData.password) {
        userData.password = '12345678';
      }
      this.userService.createUser(userData).subscribe({
        next: () => {
          this.loadUsers();
          this.closeModal();
        },
        error: (err) => {
          console.error('Erreur création:', err);
          alert(err.error?.message || 'Erreur lors de la création');
        }
      });
    }
  }

  deleteUser(): void {
    if (!this.selectedUser) return;

    this.userService.deleteUser(this.selectedUser._id).subscribe({
      next: () => {
        this.loadUsers();
        this.closeModal();
      },
      error: (err) => {
        console.error('Erreur suppression:', err);
        alert('Erreur lors de la suppression');
      }
    });
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}