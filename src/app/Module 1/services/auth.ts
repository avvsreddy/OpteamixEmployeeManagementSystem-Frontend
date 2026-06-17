import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:44304/api/Auth';

  constructor(private http: HttpClient) {}

  // Register
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Login
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // Get Profile
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  // Update Profile
  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, data);
  }

  // Forgot Password
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  // Reset Password
  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }

  // Refresh Token
  refreshToken(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh-token`, data);
  }

  // Assign Role
  assignRole(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/assign-role`, data);
  }

  // Get All Users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  // Save token
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Save refresh token
  saveRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }

  // Save email
  saveEmail(email: string): void {
    localStorage.setItem('email', email);
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get role from token
  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  // Check if logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout
  logout(): void {
    localStorage.clear();
  }

  // Upload profile picture
uploadProfilePicture(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post(`${this.apiUrl}/upload-profile-picture`, formData);
}

// Get profile picture URL
// Get profile picture as blob
getProfilePicture(): Observable<Blob> {
  return this.http.get(`${this.apiUrl}/profile-picture`, { responseType: 'blob' });
}
 
getUserProfilePicture(userId: string): Observable<Blob> {
  return this.http.get(`${this.apiUrl}/profile-picture/${userId}`, { responseType: 'blob' });
}
}