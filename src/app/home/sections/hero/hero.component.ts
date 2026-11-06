import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bookingUrl } from '../../../shared/config/site.config';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  readonly bookingUrl = bookingUrl;

  achievements = [
    {
      icon: 'fas fa-check-circle',
      text: '10+ years building automation'
    },
    {
      icon: 'fas fa-check-circle',
      text: 'Fortune 100 experience'
    },
    {
      icon: 'fas fa-check-circle',
      text: 'Built around your priorities'
    }
  ];
}
