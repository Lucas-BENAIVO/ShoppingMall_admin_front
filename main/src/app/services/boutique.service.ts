import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Boutique {
  _id: string;
  name: string;
  description: string;
  logo: string;
  ownerId: string;
  isValidated: boolean;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {
  private readonly apiUrl = 'http://localhost:3000/api/mall/boutiques';

  // Headers pour bypasser le cache navigateur
  private readonly noCache = {
    headers: new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    })
  };

  constructor(private http: HttpClient) {}

  getAllBoutiques(): Observable<Boutique[]> {
    return this.http.get<ApiResponse<Boutique[]>>(this.apiUrl, this.noCache).pipe(
      map(res => res?.data ?? [])
    );
  }

  getAllValidatedBoutiques(): Observable<Boutique[]> {
    return this.http.get<ApiResponse<Boutique[]>>(`${this.apiUrl}/validated`, this.noCache).pipe(
      map(res => res?.data ?? [])
    );
  }

  searchBoutiqueByName(name: string): Observable<Boutique[]> {
    return this.http.get<ApiResponse<Boutique[]>>(`${this.apiUrl}/search`, {
      params: { name },
      headers: this.noCache.headers
    }).pipe(
      map(res => res?.data ?? [])
    );
  }

  createBoutique(data: Partial<Boutique>): Observable<Boutique> {
    return this.http.post<ApiResponse<Boutique>>(this.apiUrl, data).pipe(
      map(res => res.data)
    );
  }

  validateBoutique(id: string): Observable<Boutique> {
    return this.http.patch<ApiResponse<Boutique>>(`${this.apiUrl}/${id}/validate`, {}).pipe(
      map(res => res.data)
    );
  }

  suspendBoutique(id: string): Observable<Boutique> {
    return this.http.patch<ApiResponse<Boutique>>(`${this.apiUrl}/${id}/suspend`, {}).pipe(
      map(res => res.data)
    );
  }
}