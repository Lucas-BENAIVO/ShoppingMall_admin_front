import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BoutiqueService, Boutique } from '../../../services/boutique.service';

interface BoutiqueDisplay {
  _id: string;
  nom: string;
  description: string;
  image: string;
  isValidated: boolean;
  createdAt: string;
  ownerName?: string;
}

@Component({
  selector: 'app-boutique-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boutique-list.component.html',
  styleUrls: ['./boutique-list.component.scss']
})
export class BoutiqueListComponent implements OnInit {
  boutiques: BoutiqueDisplay[] = [];
  filteredBoutiques: BoutiqueDisplay[] = [];
  paginatedBoutiques: BoutiqueDisplay[] = [];
  loading = true;
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  
  // Filtres
  searchQuery = '';
  statusFilter = 'all'; // 'all', 'validated', 'pending'
  sortBy = 'date-desc'; // 'date-desc', 'date-asc', 'name-asc', 'name-desc'
  
  // Image par défaut
  defaultImage = 'assets/images/shops/default-shop.svg';
  
  // Modal
  showDeleteModal = false;
  showViewModal = false;
  showEditModal = false;
  selectedBoutique: BoutiqueDisplay | null = null;
  editForm = { name: '', description: '' };

  constructor(
    private boutiqueService: BoutiqueService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBoutiques();
  }

  loadBoutiques(): void {
    this.loading = true;
    this.boutiqueService.getAllBoutiques().subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.boutiques = response.data.map(b => ({
            _id: b._id,
            nom: b.name,
            description: b.description || '',
            image: b.logo || this.defaultImage,
            isValidated: b.isValidated,
            createdAt: b.createdAt,
            ownerName: b.ownerName
          }));
          this.applyFilters();
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement boutiques:', err);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let result = [...this.boutiques];
    
    // Filtre recherche
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(b => 
        b.nom.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query)
      );
    }
    
    // Filtre statut
    if (this.statusFilter === 'validated') {
      result = result.filter(b => b.isValidated);
    } else if (this.statusFilter === 'pending') {
      result = result.filter(b => !b.isValidated);
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
    
    this.filteredBoutiques = result;
    this.totalPages = Math.ceil(result.length / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedBoutiques();
  }

  updatePaginatedBoutiques(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedBoutiques = this.filteredBoutiques.slice(start, end);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedBoutiques();
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

  onStatusFilterChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = this.defaultImage;
  }

  // Actions
  viewBoutique(boutique: BoutiqueDisplay): void {
    this.selectedBoutique = boutique;
    this.showViewModal = true;
  }

  editBoutique(boutique: BoutiqueDisplay): void {
    this.selectedBoutique = boutique;
    this.editForm = { name: boutique.nom, description: boutique.description };
    this.showEditModal = true;
  }

  confirmDeleteBoutique(boutique: BoutiqueDisplay): void {
    this.selectedBoutique = boutique;
    this.showDeleteModal = true;
  }

  deleteBoutique(): void {
    if (!this.selectedBoutique) return;
    
    this.boutiqueService.deleteBoutique(this.selectedBoutique._id).subscribe({
      next: () => {
        this.boutiques = this.boutiques.filter(b => b._id !== this.selectedBoutique?._id);
        this.applyFilters();
        this.closeModals();
      },
      error: (err) => {
        console.error('Erreur suppression:', err);
        alert('Erreur lors de la suppression');
      }
    });
  }

  saveEdit(): void {
    if (!this.selectedBoutique) return;
    
    this.boutiqueService.updateBoutique(this.selectedBoutique._id, {
      name: this.editForm.name,
      description: this.editForm.description
    }).subscribe({
      next: () => {
        const idx = this.boutiques.findIndex(b => b._id === this.selectedBoutique?._id);
        if (idx >= 0) {
          this.boutiques[idx].nom = this.editForm.name;
          this.boutiques[idx].description = this.editForm.description;
        }
        this.applyFilters();
        this.closeModals();
      },
      error: (err) => {
        console.error('Erreur modification:', err);
        alert('Erreur lors de la modification');
      }
    });
  }

  validateBoutique(boutique: BoutiqueDisplay): void {
    this.boutiqueService.validateBoutique(boutique._id).subscribe({
      next: () => {
        boutique.isValidated = true;
        this.applyFilters();
      },
      error: (err) => console.error('Erreur validation:', err)
    });
  }

  suspendBoutique(boutique: BoutiqueDisplay): void {
    this.boutiqueService.suspendBoutique(boutique._id).subscribe({
      next: () => {
        boutique.isValidated = false;
        this.applyFilters();
      },
      error: (err) => console.error('Erreur suspension:', err)
    });
  }

  closeModals(): void {
    this.showDeleteModal = false;
    this.showViewModal = false;
    this.showEditModal = false;
    this.selectedBoutique = null;
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
}
