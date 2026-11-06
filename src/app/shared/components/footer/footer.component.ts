import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { siteConfig, toTelHref } from '../../config/site.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  readonly phoneHref = toTelHref(siteConfig.publicPhoneNumber);
  readonly phoneLabel = siteConfig.publicPhoneNumber || 'Phone number coming soon';
}
