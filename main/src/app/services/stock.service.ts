import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';

export interface StockItem {
  _id: string | null;
  product: {
    _id: string;
    name: string;
    price: number;
    images?: string[];
  };
  quantity: number;
  alertThreshold: number;
  updatedAt?: string;
}

export interface StockTransaction {
  _id: string;
  productId: {
    _id: string;
    name: string;
    images?: string[];
  };
  boutiqueId: string;
  type: 'ENTREE' | 'SORTIE' | 'AJUSTEMENT' | 'VENTE' | 'RETOUR';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  createdAt: string;
}

export interface StockResponse {
  success: boolean;
  data: StockItem;
  message?: string;
}

export interface StocksListResponse {
  success: boolean;
  count: number;
  data: StockItem[];
}

export interface TransactionsListResponse {
  success: boolean;
  count: number;
  data: StockTransaction[];
}

export interface UpdateStockData {
  productId: string;
  quantity: number;
  alertThreshold?: number;
  type?: string;
  reason?: string;
}

@Injectable({ providedIn: 'root' })
export class StockService {
  private readonly apiUrl = `${environment.apiNodeUrl}/api/mall/stocks`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('adminAccessToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getStocksByBoutique(boutiqueId: string): Observable<StocksListResponse> {
    return this.http.get<StocksListResponse>(`${this.apiUrl}/boutique/${boutiqueId}`, { headers: this.getHeaders() });
  }

  getStockByProduct(productId: string): Observable<StockResponse> {
    return this.http.get<StockResponse>(`${this.apiUrl}/product/${productId}`, { headers: this.getHeaders() });
  }

  getLowStockProducts(boutiqueId?: string): Observable<StocksListResponse> {
    const params = boutiqueId ? `?boutiqueId=${boutiqueId}` : '';
    return this.http.get<StocksListResponse>(`${this.apiUrl}/low${params}`, { headers: this.getHeaders() });
  }

  updateStock(data: UpdateStockData): Observable<StockResponse> {
    return this.http.put<StockResponse>(this.apiUrl, data, { headers: this.getHeaders() });
  }

  getStockTransactions(boutiqueId: string, limit = 50): Observable<TransactionsListResponse> {
    return this.http.get<TransactionsListResponse>(`${this.apiUrl}/transactions/boutique/${boutiqueId}?limit=${limit}`, { headers: this.getHeaders() });
  }

  getProductTransactions(productId: string, limit = 20): Observable<TransactionsListResponse> {
    return this.http.get<TransactionsListResponse>(`${this.apiUrl}/transactions/product/${productId}?limit=${limit}`, { headers: this.getHeaders() });
  }
}
