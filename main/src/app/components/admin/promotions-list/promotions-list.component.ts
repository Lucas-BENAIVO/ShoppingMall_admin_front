import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromotionService, PromotionData } from '../../../services/promotion.service';

interface PromotionDisplay {
  _id: string;
  title: string;
  discountPercent: number;
  startDate: string;
  endDate: string;
  status: string;
}

@Component({
  selector: 'app-promotions-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.scss']
})
export class PromotionsListComponent implements OnInit {
  promotions: PromotionDisplay[] = [];
  filteredPromotions: PromotionDisplay[] = [];
  paginatedPromotions: PromotionDisplay[] = [];
  loading = true;

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  // Filtres
  searchQuery = '';
  selectedStatus = 'all';
  sortBy = 'date-desc';

  // Modal
  selectedPromotion: PromotionDisplay | null = null;
  showModal = false;
  showDeleteModal = false;
  isEditing = false;

  formData = {
    title: '',
    discountPercent: 10,
    startDate: '',
    endDate: ''
  };

  constructor(private promotionService: PromotionService) {}

  ngOnInit(): void {
    this.loadPromotions();
  }

  loadPromotions(): void {
    this.loading = true;
    this.promotionService.getGlobalPromotions().subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.promotions = response.data.map(p => ({
            _id: p._id,
            title: p.title,
            discountPercent: p.discountPercent,
            startDate: p.startDate,
            endDate: p.endDate,
            status: this.calculateStatus(p.startDate, p.endDate)
          }));
          this.applyFilters();
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement promotions:', err);
        this.loading = false;
      }
    });
  }

  calculateStatus(startDate: string, endDate: string): string {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) return 'À venir';
    if (now > end) return 'Expiré';
    return 'Actif';
  }

  applyFilters(): void {
    let result = [...this.promotions];

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(query));
    }

    if (this.selectedStatus !== 'all') {
      result = result.filter(p => p.status === this.selectedStatus);
    }

    switch (this.sortBy) {
      case 'date-desc':
        result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        break;
      case 'discount-desc':
        result.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
      case 'discount-asc':
        result.sort((a, b) => a.discountPercent - b.discountPercent);
        break;
    }

    this.filteredPromotions = result;
    this.totalPages = Math.ceil(result.length / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedPromotions();
  }

  updatePaginatedPromotions(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedPromotions = this.filteredPromotions.slice(start, end);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedPromotions();
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
    this.selectedPromotion = null;
    this.isEditing = false;
    const today = new Date().toISOString().split('T')[0];
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    this.formData = {
      title: '',
      discountPercent: 10,
      startDate: today,
      endDate: nextMonth.toISOString().split('T')[0]
    };
    this.showModal = true;
  }

  openEditModal(promotion: PromotionDisplay): void {
    this.selectedPromotion = promotion;
    this.isEditing = true;
    this.formData = {
      title: promotion.title,
      discountPercent: promotion.discountPercent,
      startDate: promotion.startDate.split('T')[0],
      endDate: promotion.endDate.split('T')[0]
    };
    this.showModal = true;
  }

  confirmDelete(promotion: PromotionDisplay): void {
    this.selectedPromotion = promotion;
    this.showDeleteModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.showDeleteModal = false;
    this.selectedPromotion = null;
  }

  savePromotion(): void {
    const promoData = {
      title: this.formData.title,
      discountPercent: this.formData.discountPercent,
      startDate: this.formData.startDate,
      endDate: this.formData.endDate
    };

    if (this.isEditing && this.selectedPromotion) {
      this.promotionService.updatePromotion(this.selectedPromotion._id, promoData).subscribe({
        next: () => {
          this.loadPromotions();
          this.closeModal();
        },
        error: (err) => {
          console.error('Erreur mise à jour:', err);
          alert('Erreur lors de la mise à jour');
        }
      });
    } else {
      this.promotionService.createGlobalPromotion(promoData).subscribe({
        next: () => {
          this.loadPromotions();
          this.closeModal();
        },
        error: (err) => {
          console.error('Erreur création:', err);
          alert('Erreur lors de la création');
        }
      });
    }
  }

  deletePromotion(): void {
    if (!this.selectedPromotion) return;

    this.promotionService.deletePromotion(this.selectedPromotion._id).subscribe({
      next: () => {
        this.loadPromotions();
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
