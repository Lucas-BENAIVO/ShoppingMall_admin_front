import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Boutique {
  _id: string;
  name: string;
  description?: string;
  logo?: string;
  ownerId: string;
  isValidated: boolean;
  createdAt: string;
  updatedAt: string;
  // Données enrichies
  ownerName?: string;
  productsCount?: number;
  revenue?: number;
}

export interface BoutiqueResponse {
  success: boolean;
  count?: number;
  data: Boutique | Boutique[];
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {
  private readonly apiUrl = `${environment.apiNodeUrl}/api/mall/boutiques`;

  constructor(private http: HttpClient) {}

  getAllBoutiques(): Observable<BoutiqueResponse> {
    return this.http.get<BoutiqueResponse>(this.apiUrl);
  }

  getValidatedBoutiques(): Observable<BoutiqueResponse> {
    return this.http.get<BoutiqueResponse>(`${this.apiUrl}/validated`);
  }

  getBoutiqueById(id: string): Observable<BoutiqueResponse> {
    return this.http.get<BoutiqueResponse>(`${this.apiUrl}/${id}`);
  }

  searchBoutiques(name: string): Observable<BoutiqueResponse> {
    const params = new HttpParams().set('name', name);
    return this.http.get<BoutiqueResponse>(`${this.apiUrl}/search`, { params });
  }

  createBoutique(data: Partial<Boutique>): Observable<BoutiqueResponse> {
    return this.http.post<BoutiqueResponse>(this.apiUrl, data);
  }

  updateBoutique(id: string, data: Partial<Boutique>): Observable<BoutiqueResponse> {
    return this.http.put<BoutiqueResponse>(`${this.apiUrl}/${id}`, data);
  }

  validateBoutique(id: string): Observable<BoutiqueResponse> {
    return this.http.put<BoutiqueResponse>(`${this.apiUrl}/${id}/validate`, {});
  }

  suspendBoutique(id: string): Observable<BoutiqueResponse> {
    return this.http.put<BoutiqueResponse>(`${this.apiUrl}/${id}/suspend`, {});
  }

  deleteBoutique(id: string): Observable<BoutiqueResponse> {
    return this.http.delete<BoutiqueResponse>(`${this.apiUrl}/${id}`);
  }
}
