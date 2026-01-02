import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  achievements = [
    {
      icon: 'fas fa-check-circle',
      text: '$5M+ in cost savings delivered'
    },
    {
      icon: 'fas fa-check-circle',
      text: '50+ enterprise apps migrated'
    },
    {
      icon: 'fas fa-check-circle',
      text: '15+ engineers mentored'
    },
    {
      icon: 'fas fa-check-circle',
      text: 'AWS & Azure certified expertise'
    }
  ];
}
