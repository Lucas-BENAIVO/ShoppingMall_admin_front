import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface EmplacementData {
  _id: string;
  code: string;
  zone: string;
  floor: number;
  description: string;
  boutiqueId: { _id: string; name: string } | null;
  isAvailable: boolean;
  surface: number;
  rent: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmplacementResponse {
  success: boolean;
  count?: number;
  data: EmplacementData | EmplacementData[];
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmplacementService {
  private readonly apiUrl = `${environment.apiNodeUrl}/api/mall/emplacements`;

  constructor(private http: HttpClient) {}

  getAllEmplacements(): Observable<EmplacementResponse> {
    return this.http.get<EmplacementResponse>(this.apiUrl);
  }

  getAvailableEmplacements(): Observable<EmplacementResponse> {
    return this.http.get<EmplacementResponse>(`${this.apiUrl}/available`);
  }

  getEmplacementById(id: string): Observable<EmplacementResponse> {
    return this.http.get<EmplacementResponse>(`${this.apiUrl}/${id}`);
  }

  createEmplacement(data: Partial<EmplacementData>): Observable<EmplacementResponse> {
    return this.http.post<EmplacementResponse>(this.apiUrl, data);
  }

  updateEmplacement(id: string, data: Partial<EmplacementData>): Observable<EmplacementResponse> {
    return this.http.put<EmplacementResponse>(`${this.apiUrl}/${id}`, data);
  }

  assignBoutique(id: string, boutiqueId: string | null): Observable<EmplacementResponse> {
    return this.http.put<EmplacementResponse>(`${this.apiUrl}/${id}/assign`, { boutiqueId });
  }

  deleteEmplacement(id: string): Observable<EmplacementResponse> {
    return this.http.delete<EmplacementResponse>(`${this.apiUrl}/${id}`);
  }
}
