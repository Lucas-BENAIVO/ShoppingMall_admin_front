// import { Component } from '@angular/core';
// import { ProduitsFormComponent } from '../produits-form/produits-form.component';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-produits-list',
//   standalone: true,
//   templateUrl: './produits-list.component.html',
//   styleUrls: ['./produits-list.component.scss']
//   ,
//   imports: [CommonModule, ProduitsFormComponent]
// })
// export class ProduitsListComponent {
//   showForm = false;
//   editProduct: any = null;

//   openAddForm() {
//     this.editProduct = null;
//     this.showForm = true;
//   }

//   openEditForm(product: any) {
//     this.editProduct = product;
//     this.showForm = true;
//   }

//   closeForm() {
//     this.showForm = false;
//     this.editProduct = null;
//   }
// }
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../../services/product.service';
import { ProduitsFormComponent } from '../produits-form/produits-form.component';
import {
  Subject, debounceTime, distinctUntilChanged,
  switchMap, of, catchError, takeUntil
} from 'rxjs';

@Component({
  selector: 'app-produits-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProduitsFormComponent],
  templateUrl: './produits-list.component.html',
  styleUrls: ['./produits-list.component.scss']
})
export class ProduitsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  searchQuery = '';
  selectedCategory = '';
  isLoading = false;
  errorMessage = '';

  showForm = false;
  editProduct: Product | null = null;

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setupSearch();
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ─── Chargement ───────────────────────────────────────────────

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.products = data ?? [];
          this.applyFilters();
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erreur chargement produits', err);
          this.errorMessage = 'Impossible de charger les produits.';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }

  // ─── Recherche ────────────────────────────────────────────────

  private setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((query) => {
        const trimmed = query.trim();
        if (!trimmed) return of([...this.products]);

        return this.productService.searchProductByName(trimmed).pipe(
          catchError(() => of(
            this.products.filter(p =>
              p.name.toLowerCase().includes(trimmed.toLowerCase())
            )
          ))
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe((results) => {
      this.filteredProducts = this.filterByCategory(results ?? []);
      this.currentPage = 1;
      this.cdr.detectChanges();
    });
  }

  onSearchChange(value: string): void {
    this.searchQuery = value;
    this.searchSubject.next(value);
  }

  onCategoryChange(value: string): void {
    this.selectedCategory = value;
    this.applyFilters();
  }

  private applyFilters(): void {
    let result = [...this.products];
    if (this.searchQuery.trim()) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.filteredProducts = this.filterByCategory(result);
    this.currentPage = 1;
  }

  private filterByCategory(list: Product[]): Product[] {
    if (!this.selectedCategory) return list;
    return list.filter(p => p.categoryId === this.selectedCategory);
  }

  // ─── Pagination ───────────────────────────────────────────────

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ─── CRUD ─────────────────────────────────────────────────────

  openAddForm(): void {
    this.editProduct = null;
    this.showForm = true;
  }

  openEditForm(product: Product): void {
    this.editProduct = { ...product };
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editProduct = null;
    this.loadProducts();
  }

  deleteProduct(product: Product): void {
    if (!confirm(`Supprimer "${product.name}" ?`)) return;

    this.productService.deleteProduct(product._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.products = this.products.filter(p => p._id !== product._id);
          this.applyFilters();
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Erreur suppression', err)
      });
  }

  // ─── Helpers ──────────────────────────────────────────────────

  getImageUrl(image: string): string {
    if (!image) return 'assets/images/products/default.png';
    return image.startsWith('http') ? image : `assets/images/products/${image}`;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  }

  getStockStatus(stock: number): { label: string; css: string } {
    if (stock === 0) return { label: 'Rupture', css: 'out-of-stock' };
    if (stock < 10) return { label: 'Stock faible', css: 'low-stock' };
    return { label: 'En stock', css: 'in-stock' };
  }
}