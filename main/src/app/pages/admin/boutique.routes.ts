import { Routes } from '@angular/router';

export const BoutiqueRoutes: Routes = [
  {
    path: 'boutique',
    loadComponent: () => import('./boutique/boutique.page').then(m => m.BoutiquePage),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'produits',
    loadComponent: () => import('./produits/produits.page').then(m => m.ProduitsPage),
  },
  {
    path: 'commandes',
    loadComponent: () => import('./commandes/commandes.page').then(m => m.CommandesPageComponent),
  },
  {
    path: 'promotions',
    loadComponent: () => import('./promotions/promotions.page').then(m => m.PromotionsPageComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePageComponent),
  },
  {
    path: 'utilisateurs',
    loadComponent: () => import('./utilisateurs/utilisateurs.page').then(m => m.UtilisateursPage),
  },
  {
    path: 'emplacements',
    loadComponent: () => import('./emplacements/emplacements.page').then(m => m.EmplacementsPage),
  },
];
