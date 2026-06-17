import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { ImageCropperComponent,ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule,ImageCropperComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  user: any = {};
  isEditing = false;
  isLoading = true;
  successMessage = '';
  errorMessage = '';
  profileImageUrl = '';
  imageChangedEvent: any = '';

croppedBlob!: Blob;

showCropper = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.isLoading = true;
    this.authService.getProfile().subscribe({
      next: (response: any) => {
        console.log('Profile response:', response);
        this.user = response;
        this.isLoading = false;

        if (this.user.hasProfileImage) {
          this.loadProfileImage();
        }

        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log('Profile error:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  loadProfileImage() {
    this.authService.getProfilePicture().subscribe({
      next: (blob: Blob) => {
        this.profileImageUrl = URL.createObjectURL(blob);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log('Failed to load image', err);
      }
    });
  }

 onFileSelected(event: any) {

  this.imageChangedEvent = event;

  this.showCropper = true;

}
imageCropped(event: ImageCroppedEvent) {

  if (event.blob) {

    this.croppedBlob = event.blob;

  }

}

saveCroppedImage() {

  if (!this.croppedBlob) return;

  const file = new File(

    [this.croppedBlob],

    'profile.png',

    {

      type: 'image/png'

    }

  );

  this.authService
    .uploadProfilePicture(file)

    .subscribe({

      next: () => {

        this.successMessage =

          'Profile picture updated!';

        this.user.hasProfileImage = true;

        this.showCropper = false;

        this.loadProfileImage();

      },

      error: () => {

        this.errorMessage =

          'Failed to upload picture!';

      }

    });

}

  onUpdate() {
    this.successMessage = '';
    this.errorMessage = '';

    this.authService.updateProfile({
      fullName: this.user.fullName,
      phoneNumber: this.user.phoneNumber,
      dateOfBirth: this.user.dateOfBirth,
      address: this.user.address,
      department: this.user.department,
      gender: this.user.gender,
      employeeCode: this.user.employeeCode
    }).subscribe({
      next: () => {
        this.isEditing = false;
        this.successMessage = 'Profile updated successfully!';
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to update profile!';
        this.cdr.detectChanges();
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getRole(): string {
    return this.authService.getRole() || 'Employee';
  }
}