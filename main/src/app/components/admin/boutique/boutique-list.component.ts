import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoutiqueService, Boutique } from '../../../services/boutique.service';
import { debounceTime, distinctUntilChanged, Subject, switchMap, of, catchError, takeUntil } from 'rxjs';

@Component({
  selector: 'app-boutique-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boutique-list.component.html',
  styleUrls: ['./boutique-list.component.scss']
})
export class BoutiqueListComponent implements OnInit, OnDestroy {
  boutiques: Boutique[] = [];
  filteredBoutiques: Boutique[] = [];

  searchQuery = '';
  isLoading = false;
  errorMessage = '';

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private boutiqueService: BoutiqueService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setupSearch();
    this.loadBoutiques();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadBoutiques(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.boutiqueService.getAllBoutiques()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.boutiques = data ?? [];
          this.filteredBoutiques = [...this.boutiques];
          this.isLoading = false;
          this.cdr.detectChanges(); // 👈 force la mise à jour
        },
        error: (err) => {
          console.error('Erreur chargement boutiques', err);
          this.errorMessage = 'Impossible de charger les boutiques.';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }

  private setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((query) => {
        const trimmed = query.trim();
        if (!trimmed) return of([...this.boutiques]);

        return this.boutiqueService.searchBoutiqueByName(trimmed).pipe(
          catchError(() => of(
            this.boutiques.filter(b =>
              b.name.toLowerCase().includes(trimmed.toLowerCase())
            )
          ))
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe((results) => {
      this.filteredBoutiques = results ?? [];
      this.cdr.detectChanges();
    });
  }

  onSearchChange(value: string): void {
    this.searchQuery = value;
    this.searchSubject.next(value);
  }

  validateBoutique(boutique: Boutique): void {
    this.boutiqueService.validateBoutique(boutique._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updated) => {
          this.updateLocal(updated);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Erreur validation', err)
      });
  }

  suspendBoutique(boutique: Boutique): void {
    this.boutiqueService.suspendBoutique(boutique._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updated) => {
          this.updateLocal(updated);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Erreur suspension', err)
      });
  }

  private updateLocal(updated: Boutique): void {
    this.boutiques = this.boutiques.map(b => b._id === updated._id ? updated : b);
    this.filteredBoutiques = this.filteredBoutiques.map(b => b._id === updated._id ? updated : b);
  }

  getLogoUrl(logo: string): string {
    if (!logo) return 'assets/images/shops/default.png';
    return logo.startsWith('http') ? logo : `assets/images/shops/${logo}`;
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}