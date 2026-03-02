import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';

export interface UserData {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  phone?: string;
  isActive: boolean;
  profilePicturePath?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  success: boolean;
  count?: number;
  data: UserData | UserData[];
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = `${environment.apiNodeUrl}/api/mall/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.apiUrl);
  }

  getUserById(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${id}`);
  }

  searchUsers(query: string, role?: string): Observable<UserResponse> {
    let params = new HttpParams();
    if (query) params = params.set('q', query);
    if (role && role !== 'all') params = params.set('role', role);
    return this.http.get<UserResponse>(`${this.apiUrl}/search`, { params });
  }

  createUser(userData: Partial<UserData> & { password?: string }): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.apiUrl, userData);
  }

  updateUser(id: string, userData: Partial<UserData> & { password?: string }): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.apiUrl}/${id}`, userData);
  }

  deleteUser(id: string): Observable<UserResponse> {
    return this.http.delete<UserResponse>(`${this.apiUrl}/${id}`);
  }
}
