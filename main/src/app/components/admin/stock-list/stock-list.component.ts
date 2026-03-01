import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { StockService, StockItem, UpdateStockData } from '../../../services/stock.service';
import { BoutiqueService } from '../../../services/boutique.service';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  stocks: StockItem[] = [];
  filteredStocks: StockItem[] = [];
  paginatedStocks: StockItem[] = [];
  boutiques: any[] = [];
  selectedBoutiqueId = '';
  isLoading = false;
  searchTerm = '';
  filterStatus = 'all';

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  // Modal
  showEditModal = false;
  editingStock: StockItem | null = null;
  editForm = {
    quantity: 0,
    alertThreshold: 5,
    type: 'AJUSTEMENT',
    reason: ''
  };

  // Historique modal
  showHistoryModal = false;
  historyProduct: StockItem | null = null;
  transactions: any[] = [];
  loadingHistory = false;

  constructor(
    private stockService: StockService,
    private boutiqueService: BoutiqueService
  ) {}

  ngOnInit(): void {
    this.loadBoutiques();
  }

  loadBoutiques(): void {
    this.boutiqueService.getAllBoutiques().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.boutiques = res.data.filter((b: any) => b.status === 'actif');
          if (this.boutiques.length > 0) {
            this.selectedBoutiqueId = this.boutiques[0]._id;
            this.loadStocks();
          }
        }
      },
      error: (err) => console.error('Erreur chargement boutiques:', err)
    });
  }

  loadStocks(): void {
    if (!this.selectedBoutiqueId) return;
    
    this.isLoading = true;
    this.stockService.getStocksByBoutique(this.selectedBoutiqueId).subscribe({
      next: (res) => {
        if (res.success) {
          this.stocks = res.data;
          this.applyFilters();
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement stocks:', err);
        this.isLoading = false;
      }
    });
  }

  onBoutiqueChange(): void {
    this.loadStocks();
  }

  applyFilters(): void {
    let result = [...this.stocks];
    
    // Filter by search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(s => s.product.name.toLowerCase().includes(term));
    }
    
    // Filter by status
    if (this.filterStatus === 'low') {
      result = result.filter(s => s.quantity <= s.alertThreshold && s.quantity > 0);
    } else if (this.filterStatus === 'out') {
      result = result.filter(s => s.quantity === 0);
    } else if (this.filterStatus === 'ok') {
      result = result.filter(s => s.quantity > s.alertThreshold);
    }
    
    this.filteredStocks = result;
    this.totalPages = Math.ceil(result.length / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedStocks();
  }

  updatePaginatedStocks(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedStocks = this.filteredStocks.slice(start, end);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedStocks();
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

  getStockStatus(stock: StockItem): string {
    if (stock.quantity === 0) return 'Rupture';
    if (stock.quantity <= stock.alertThreshold) return 'Stock bas';
    return 'En stock';
  }

  getStockStatusClass(stock: StockItem): string {
    if (stock.quantity === 0) return 'out-stock';
    if (stock.quantity <= stock.alertThreshold) return 'low-stock';
    return 'in-stock';
  }

  // Edit modal
  openEditModal(stock: StockItem): void {
    this.editingStock = stock;
    this.editForm = {
      quantity: stock.quantity,
      alertThreshold: stock.alertThreshold,
      type: 'AJUSTEMENT',
      reason: ''
    };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editingStock = null;
  }

  saveStock(): void {
    if (!this.editingStock) return;

    const data: UpdateStockData = {
      productId: this.editingStock.product._id,
      quantity: this.editForm.quantity,
      alertThreshold: this.editForm.alertThreshold,
      type: this.editForm.type,
      reason: this.editForm.reason
    };

    this.stockService.updateStock(data).subscribe({
      next: (res) => {
        if (res.success) {
          this.loadStocks();
          this.closeEditModal();
        }
      },
      error: (err) => console.error('Erreur mise à jour stock:', err)
    });
  }

  // History modal
  openHistoryModal(stock: StockItem): void {
    this.historyProduct = stock;
    this.showHistoryModal = true;
    this.loadingHistory = true;
    this.transactions = [];

    this.stockService.getProductTransactions(stock.product._id).subscribe({
      next: (res) => {
        if (res.success) {
          this.transactions = res.data;
        }
        this.loadingHistory = false;
      },
      error: (err) => {
        console.error('Erreur chargement historique:', err);
        this.loadingHistory = false;
      }
    });
  }

  closeHistoryModal(): void {
    this.showHistoryModal = false;
    this.historyProduct = null;
    this.transactions = [];
  }

  getTransactionTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'ENTREE': 'Entrée',
      'SORTIE': 'Sortie',
      'AJUSTEMENT': 'Ajustement',
      'VENTE': 'Vente',
      'RETOUR': 'Retour'
    };
    return labels[type] || type;
  }

  getTransactionTypeClass(type: string): string {
    const classes: { [key: string]: string } = {
      'ENTREE': 'type-entree',
      'SORTIE': 'type-sortie',
      'AJUSTEMENT': 'type-ajustement',
      'VENTE': 'type-vente',
      'RETOUR': 'type-retour'
    };
    return classes[type] || '';
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getProductImage(stock: StockItem): string {
    if (stock.product.images && stock.product.images.length > 0) {
      return stock.product.images[0];
    }
    return '';
  }
}
