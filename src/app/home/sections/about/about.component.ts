import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Achievement {
  icon: string;
  bgColor: string;
  iconColor: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  achievements: Achievement[] = [
    {
      icon: 'fas fa-dollar-sign',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: '$5M+ Cost Savings',
      description: 'Through AI automation and cloud optimization'
    },
    {
      icon: 'fas fa-graduation-cap',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      title: '30+ Developers Trained',
      description: '8 successfully transitioned to engineering roles'
    },
    {
      icon: 'fas fa-server',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      title: '50+ Apps Migrated',
      description: 'Enterprise-scale cloud transformations'
    },
    {
      icon: 'fas fa-clock',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      title: '70% Faster Processing',
      description: 'AI document intelligence implementation'
    }
  ];
}
