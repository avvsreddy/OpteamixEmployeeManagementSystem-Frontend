import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  // onLogin() {
  //   this.isLoading = true;
  //   this.errorMessage = '';

  //   this.authService.login({
  //     email: this.email,
  //     password: this.password
  //   }).subscribe({
  //     next: (response) => {
  //       this.authService.saveToken(response.token);
  //       this.authService.saveRefreshToken(response.refreshToken);
  //       this.authService.saveEmail(this.email);
  //       this.isLoading = false;
  //       this.cdr.detectChanges();
  //       setTimeout(() => {
  //         this.router.navigate(['/profile']);
  //       }, 500);
  //     },
  //     error: (err) => {
  //       this.isLoading = false;
  //       this.errorMessage = 'Invalid email or password!';
  //       this.cdr.detectChanges();
  //     }
  //   });
  onLogin() {
  this.isLoading = true;
  this.errorMessage = '';

  this.authService.login({
    email: this.email,
    password: this.password
  }).subscribe({
    next: (response) => {

      // Remove old data
      localStorage.clear();

      // Save new token
      this.authService.saveToken(response.token);
      this.authService.saveRefreshToken(response.refreshToken);
      this.authService.saveEmail(this.email);

      this.isLoading = false;
      this.cdr.detectChanges();

      setTimeout(() => {
        this.router.navigate(['/profile']);
      }, 500);
    },

    error: (err) => {
      this.isLoading = false;
      this.errorMessage = 'Invalid email or password!';
      this.cdr.detectChanges();
    }
  });

  }
}