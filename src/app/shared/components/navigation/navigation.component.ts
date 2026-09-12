import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { siteConfig, toTelHref } from '../../config/site.config';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  mobileMenuOpen = false;
  readonly phoneHref = toTelHref(siteConfig.publicPhoneNumber);
  readonly phoneLabel = siteConfig.publicPhoneNumber || 'Call/text coming soon';

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
