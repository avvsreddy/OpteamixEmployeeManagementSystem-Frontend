import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  @HostListener('window:scroll', [])
onScroll(): void {

  const scrollY = window.scrollY;

  // Hands grow slowly
  const handScale = 1 + Math.min(scrollY / 3000, 1);

  // Logo shrinks
  const logoScale = Math.max(1 - scrollY / 3000, 0.4);

  const humanHand =
    document.querySelector('.human-hand') as HTMLElement;

  const digitalHand =
    document.querySelector('.digital-hand') as HTMLElement;

  const companyLogo =
    document.querySelector('.company-logo') as HTMLElement;

  if (humanHand) {
    humanHand.style.transform = `scale(${handScale})`;
  }

  if (digitalHand) {
    digitalHand.style.transform = `scale(${handScale})`;
  }

  if (companyLogo) {
    companyLogo.style.transform =
      `translate(-50%, -50%) scale(${logoScale})`;
  }
}
}