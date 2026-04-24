import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuth();
  }

  private checkAuth(): void {
    const token = this.getToken();
    if (token) {
      this.http.get<User>(`${this.apiUrl}/me`).subscribe({
        next: (user) => this.currentUserSubject.next(user),
        error: () => this.logout()
      });
    }
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request).pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  googleLogin(idToken: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/google-login`, { idToken }).pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  azureAdLogin(accessToken: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/azuread-login`, { accessToken }).pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  faceLogin(faceDescriptor: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/face-login`, { faceDescriptor }).pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  registerFace(userId: number, faceDescriptor: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-face`, { userId, faceDescriptor });
  }

  private handleAuthResponse(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    this.currentUserSubject.next({
      userId: response.userId.toString(),
      username: response.username,
      email: response.email
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    sessionStorage.removeItem('azureAdProcessedToken');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  handleAzureAdCallback(token: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    
    // Update current user subject
    this.currentUserSubject.next({
      userId: '',
      username: username,
      email: ''
    });
    
    // Fetch full user details from backend
    this.http.get<User>(`${this.apiUrl}/me`).subscribe({
      next: (user) => this.currentUserSubject.next(user),
      error: (err) => console.error('Failed to fetch user details', err)
    });
  }
}