import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';


export interface User {
  _id: string;
  id?: string;
  fullName: string;
  email?: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiNodeUrl}/api/mall/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          if (response?.accessToken && response?.refreshToken) {
            // Vérifier que l'utilisateur est un admin
            if (response.user.role !== 'ADMIN_CENTRE') {
              throw new Error('Accès non autorisé. Seuls les administrateurs peuvent se connecter.');
            }
            localStorage.setItem('adminAccessToken', response.accessToken);
            localStorage.setItem('adminRefreshToken', response.refreshToken);
            localStorage.setItem('adminUser', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('adminAccessToken');
    localStorage.removeItem('adminRefreshToken');
    localStorage.removeItem('adminUser');
    this.currentUserSubject.next(null);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('adminAccessToken');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getUserId(): string | null {
    const user = this.getCurrentUser();
    return user?._id || user?.id || null;
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'ADMIN_CENTRE';
  }

  updateCurrentUser(user: User): void {
    localStorage.setItem('adminUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
