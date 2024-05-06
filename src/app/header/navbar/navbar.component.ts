import { CommonModule } from '@angular/common';
import { Component, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CapitalizationPipe } from '../../pipes/capitalization.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, CapitalizationPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  currentUrl: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      this.currentUrl = this.router.url.replace(/\//g, '');
    });
  }
}
