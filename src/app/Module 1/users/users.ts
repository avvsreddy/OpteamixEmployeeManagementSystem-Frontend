import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {
  users: any[] = [];
  isLoading = true;
  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {

  this.isLoading = true;

  this.authService.getAllUsers().subscribe({

    next: (response: any) => {

      console.log('Users:', response);

      this.users = response;

      this.loadUserPictures();

      this.isLoading = false;

      this.cdr.detectChanges();

    },

    error: (err: any) => {

      this.isLoading = false;

      this.cdr.detectChanges();

      if (err.status === 401) {

        this.router.navigate(['/login']);

      }

    }

  });

}

loadUserPictures() {

  this.users.forEach(user => {

    console.log(
      user.fullName,
      user.hasProfileImage
    );

    if (user.hasProfileImage) {

      this.authService
        .getUserProfilePicture(user.id)

        .subscribe({

          next: (blob: Blob) => {

            user.imageUrl = URL.createObjectURL(blob);

            this.cdr.detectChanges();

          },

          error: (err) => {

            console.log(
              'Image Error',
              user.fullName,
              err
            );

          }

        });

    }

  });

}

  assignRole(user: any) {
    if (!user.selectedRole) {
      this.errorMessage = 'Please select a role!';
      this.cdr.detectChanges();
      return;
    }

    this.authService.assignRole({
      email: user.email,
      role: user.selectedRole
    }).subscribe({
      next: (response: any) => {
        this.successMessage = `Role ${user.selectedRole} assigned to ${user.email}!`;
        this.errorMessage = '';
        user.roles.push(user.selectedRole);
        user.selectedRole = '';
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Failed to assign role!';
        this.successMessage = '';
        this.cdr.detectChanges();
      }
    });
  }
}