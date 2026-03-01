import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmplacementService, EmplacementData } from '../../../services/emplacement.service';
import { BoutiqueService } from '../../../services/boutique.service';

interface EmplacementDisplay {
  _id: string;
  code: string;
  zone: string;
  floor: number;
  description: string;
  boutiqueName: string | null;
  boutiqueId: string | null;
  isAvailable: boolean;
  surface: number;
  rent: number;
}

interface BoutiqueOption {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-emplacements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './emplacements.component.html',
  styleUrls: ['./emplacements.component.scss']
})
export class EmplacementsComponent implements OnInit {
  emplacements: EmplacementDisplay[] = [];
  filteredEmplacements: EmplacementDisplay[] = [];
  paginatedEmplacements: EmplacementDisplay[] = [];
  boutiques: BoutiqueOption[] = [];
  loading = true;

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  // Filtres
  searchQuery = '';
  selectedZone = 'all';
  selectedStatus = 'all';
  sortBy = 'code-asc';

  // Modal
  selectedEmplacement: EmplacementDisplay | null = null;
  showModal = false;
  showDeleteModal = false;
  isEditing = false;

  formData = {
    code: '',
    zone: 'A',
    floor: 0,
    description: '',
    surface: 0,
    rent: 0,
    boutiqueId: ''
  };

  zones = ['A', 'B', 'C', 'D', 'E', 'F'];

  constructor(
    private emplacementService: EmplacementService,
    private boutiqueService: BoutiqueService
  ) {}

  ngOnInit(): void {
    this.loadEmplacements();
    this.loadBoutiques();
  }

  loadBoutiques(): void {
    this.boutiqueService.getValidatedBoutiques().subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.boutiques = response.data.map(b => ({
            _id: b._id,
            name: b.name
          }));
        }
      },
      error: (err) => console.error('Erreur chargement boutiques:', err)
    });
  }

  loadEmplacements(): void {
    this.loading = true;
    this.emplacementService.getAllEmplacements().subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.emplacements = response.data.map(e => ({
            _id: e._id,
            code: e.code,
            zone: e.zone,
            floor: e.floor,
            description: e.description,
            boutiqueName: e.boutiqueId ? e.boutiqueId.name : null,
            boutiqueId: e.boutiqueId ? e.boutiqueId._id : null,
            isAvailable: e.isAvailable,
            surface: e.surface,
            rent: e.rent
          }));
          this.applyFilters();
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement emplacements:', err);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let result = [...this.emplacements];

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(e =>
        e.code.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query) ||
        (e.boutiqueName && e.boutiqueName.toLowerCase().includes(query))
      );
    }

    if (this.selectedZone !== 'all') {
      result = result.filter(e => e.zone === this.selectedZone);
    }

    if (this.selectedStatus !== 'all') {
      const isAvailable = this.selectedStatus === 'available';
      result = result.filter(e => e.isAvailable === isAvailable);
    }

    switch (this.sortBy) {
      case 'code-asc':
        result.sort((a, b) => a.code.localeCompare(b.code));
        break;
      case 'code-desc':
        result.sort((a, b) => b.code.localeCompare(a.code));
        break;
      case 'surface-desc':
        result.sort((a, b) => b.surface - a.surface);
        break;
      case 'rent-desc':
        result.sort((a, b) => b.rent - a.rent);
        break;
    }

    this.filteredEmplacements = result;
    this.totalPages = Math.ceil(result.length / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedEmplacements();
  }

  updatePaginatedEmplacements(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEmplacements = this.filteredEmplacements.slice(start, end);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedEmplacements();
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

  openAddModal(): void {
    this.selectedEmplacement = null;
    this.isEditing = false;
    this.formData = { code: '', zone: 'A', floor: 0, description: '', surface: 0, rent: 0, boutiqueId: '' };
    this.showModal = true;
  }

  openEditModal(emplacement: EmplacementDisplay): void {
    this.selectedEmplacement = emplacement;
    this.isEditing = true;
    this.formData = {
      code: emplacement.code,
      zone: emplacement.zone,
      floor: emplacement.floor,
      description: emplacement.description,
      surface: emplacement.surface,
      rent: emplacement.rent,
      boutiqueId: emplacement.boutiqueId || ''
    };
    this.showModal = true;
  }

  confirmDelete(emplacement: EmplacementDisplay): void {
    this.selectedEmplacement = emplacement;
    this.showDeleteModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.showDeleteModal = false;
    this.selectedEmplacement = null;
  }

  saveEmplacement(): void {
    const data: any = {
      code: this.formData.code,
      zone: this.formData.zone,
      floor: this.formData.floor,
      description: this.formData.description,
      surface: this.formData.surface,
      rent: this.formData.rent,
      boutiqueId: this.formData.boutiqueId || null,
      isAvailable: !this.formData.boutiqueId
    };

    if (this.isEditing && this.selectedEmplacement) {
      this.emplacementService.updateEmplacement(this.selectedEmplacement._id, data).subscribe({
        next: () => {
          this.loadEmplacements();
          this.closeModal();
        },
        error: (err) => {
          console.error('Erreur mise à jour:', err);
          alert(err.error?.message || 'Erreur lors de la mise à jour');
        }
      });
    } else {
      this.emplacementService.createEmplacement(data).subscribe({
        next: () => {
          this.loadEmplacements();
          this.closeModal();
        },
        error: (err) => {
          console.error('Erreur création:', err);
          alert(err.error?.message || 'Erreur lors de la création');
        }
      });
    }
  }

  deleteEmplacement(): void {
    if (!this.selectedEmplacement) return;

    this.emplacementService.deleteEmplacement(this.selectedEmplacement._id).subscribe({
      next: () => {
        this.loadEmplacements();
        this.closeModal();
      },
      error: (err) => {
        console.error('Erreur suppression:', err);
        alert('Erreur lors de la suppression');
      }
    });
  }

  getFloorLabel(floor: number): string {
    if (floor === 0) return 'RDC';
    return floor + 'e étage';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' Ar';
  }
}
