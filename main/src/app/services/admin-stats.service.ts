import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';


export interface GlobalStats {
  boutiques: { total: number; validees: number; enAttente: number };
  utilisateurs: { total: number; actifs: number };
  produits: number;
  commandes: { total: number; revenue: number };
  promotions: number;
  categories: number;
}

export interface TopBoutique {
  _id: string;
  nom: string;
  logo: string;
  revenue: number;
  commandes: number;
  produits: number;
}

export interface CategoryDistribution {
  _id: string;
  nom: string;
  count: number;
}

export interface RecentUser {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  profilePicturePath: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminStatsService {
  private readonly apiUrl = `${environment.apiNodeUrl}/api/mall/stats/admin`;

  constructor(private http: HttpClient) {}

  getGlobalStats(): Observable<{ success: boolean; data: GlobalStats }> {
    return this.http.get<{ success: boolean; data: GlobalStats }>(`${this.apiUrl}/global`);
  }

  getTopBoutiques(): Observable<{ success: boolean; data: TopBoutique[] }> {
    return this.http.get<{ success: boolean; data: TopBoutique[] }>(`${this.apiUrl}/top-boutiques`);
  }

  getCategoriesDistribution(): Observable<{ success: boolean; data: CategoryDistribution[] }> {
    return this.http.get<{ success: boolean; data: CategoryDistribution[] }>(`${this.apiUrl}/categories-distribution`);
  }

  getRecentUsers(): Observable<{ success: boolean; data: RecentUser[] }> {
    return this.http.get<{ success: boolean; data: RecentUser[] }>(`${this.apiUrl}/recent-users`);
  }
}
