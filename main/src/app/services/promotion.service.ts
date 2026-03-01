import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PromotionData {
  _id: string;
  title: string;
  discountPercent: number;
  startDate: string;
  endDate: string;
  boutiqueId: string | null;
  productIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PromotionResponse {
  success: boolean;
  count?: number;
  data: PromotionData | PromotionData[];
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private readonly apiUrl = `${environment.apiNodeUrl}/api/mall/promotions`;

  constructor(private http: HttpClient) {}

  getAllPromotions(): Observable<PromotionResponse> {
    return this.http.get<PromotionResponse>(this.apiUrl);
  }

  getGlobalPromotions(): Observable<PromotionResponse> {
    return this.http.get<PromotionResponse>(`${this.apiUrl}/global`);
  }

  getActivePromotions(): Observable<PromotionResponse> {
    return this.http.get<PromotionResponse>(`${this.apiUrl}/active`);
  }

  getPromotionById(id: string): Observable<PromotionResponse> {
    return this.http.get<PromotionResponse>(`${this.apiUrl}/${id}`);
  }

  createGlobalPromotion(promotionData: Partial<PromotionData>): Observable<PromotionResponse> {
    return this.http.post<PromotionResponse>(`${this.apiUrl}/global`, promotionData);
  }

  updatePromotion(id: string, promotionData: Partial<PromotionData>): Observable<PromotionResponse> {
    return this.http.put<PromotionResponse>(`${this.apiUrl}/${id}`, promotionData);
  }

  deletePromotion(id: string): Observable<PromotionResponse> {
    return this.http.delete<PromotionResponse>(`${this.apiUrl}/${id}`);
  }
}
