import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  role: string = '';
  isLoggedIn: boolean = false;
  showNavbar: boolean = true;

  private hiddenRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.showNavbar = !this.hiddenRoutes.includes(event.urlAfterRedirects);
      this.updateNavbar();
    });

    this.showNavbar = !this.hiddenRoutes.includes(this.router.url);
    this.updateNavbar();
  }

  updateNavbar() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.role = this.authService.getRole() || '';
    this.cdr.detectChanges();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return this.role === 'Admin';
  }

  isManager(): boolean {
    return this.role === 'Manager';
  }
}