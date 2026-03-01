import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  boutiqueId: string;
  image: string;
  isActive: boolean;
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
export class ProductService {
  private readonly apiUrl = 'http://localhost:3000/api/mall/products';

  private readonly noCache = {
    headers: new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    })
  };

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<ApiResponse<Product[]>>(this.apiUrl, this.noCache).pipe(
      map(res => res?.data ?? [])
    );
  }

  getProductsByBoutique(boutiqueId: string): Observable<Product[]> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/boutique/${boutiqueId}`, this.noCache).pipe(
      map(res => res?.data ?? [])
    );
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/category/${categoryId}`, this.noCache).pipe(
      map(res => res?.data ?? [])
    );
  }

  searchProductByName(name: string): Observable<Product[]> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/search`, {
      params: { name },
      headers: this.noCache.headers
    }).pipe(
      map(res => res?.data ?? [])
    );
  }

  createProduct(data: Partial<Product>): Observable<Product> {
    return this.http.post<ApiResponse<Product>>(this.apiUrl, data).pipe(
      map(res => res.data)
    );
  }

  updateProduct(id: string, data: Partial<Product>): Observable<Product> {
    return this.http.put<ApiResponse<Product>>(`${this.apiUrl}/${id}`, data).pipe(
      map(res => res.data)
    );
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}