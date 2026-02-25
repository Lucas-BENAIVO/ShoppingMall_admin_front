import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private API_URL = 'http://localhost:3000/api/mall/auth'; 
  // ⚠️ adapte selon ton backend (ex: http://localhost:5000)

  constructor(private http: HttpClient) {}

  // ===============================
  // LOGIN
  // ===============================
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, { email, password })
      .pipe(
        tap(response => {
          if (response?.accessToken && response?.refreshToken) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.user));
          }
        })
      );
  }

  // ===============================
  // REGISTER
  // ===============================
  register(data: {
    fullName: string;
    email: string;
    password: string;
    role: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/register`, data);
  }

  // ===============================
  // REFRESH TOKEN
  // ===============================
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');

    return this.http.post<any>(`${this.API_URL}/refresh`, {
      refreshToken: refreshToken
    }).pipe(
      tap(response => {
        if (response?.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
        }
      })
    );
  }

  // ===============================
  // LOGOUT
  // ===============================
  logout(): void {
    localStorage.clear();
  }

  // ===============================
  // GETTERS
  // ===============================
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}