import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPassword {
  email = '';
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onForgotPassword() {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
  this.isLoading = false;
  this.successMessage = 'Reset email sent! Check your inbox.';
  this.cdr.detectChanges();
  setTimeout(() => {
    this.router.navigate(['/reset-password'], {
      queryParams: { email: this.email }
    });
  }, 2000);
},
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to send reset email!';
        this.cdr.detectChanges();
      }
    });
  }
}