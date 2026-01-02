import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MentorshipProgram {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  items: string[];
  ctaText: string;
}

interface Workshop {
  title: string;
  description: string;
}

@Component({
  selector: 'app-mentorship',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mentorship.component.html',
  styleUrls: ['./mentorship.component.css']
})
export class MentorshipComponent {
  programs: MentorshipProgram[] = [
    {
      id: 'corporate',
      title: 'Corporate Upskilling',
      icon: 'fas fa-users',
      color: 'green',
      description: `Custom training programs for engineering teams. Proven track record: 8 non-technical employees 
        successfully transitioned to engineering roles through structured mentorship.`,
      items: [
        'Tailored curriculum for your tech stack',
        'Hands-on project work with real codebases',
        'AI/Cloud best practices workshops',
        'Progress tracking & ROI reporting'
      ],
      ctaText: 'Discuss Team Training'
    },
    {
      id: 'mentorship',
      title: '1-on-1 Technical Mentorship',
      icon: 'fas fa-user-graduate',
      color: 'orange',
      description: `Personalized guidance for developers looking to level up their skills, pivot to AI/cloud, 
        or build portfolio-worthy projects that demonstrate real-world capabilities.`,
      items: [
        'Code reviews & architecture feedback',
        'Career roadmap planning',
        'Pair programming on real projects',
        'Interview prep & technical coaching'
      ],
      ctaText: 'Schedule Session'
    }
  ];

  workshops: Workshop[] = [
    {
      title: 'AI Integration Bootcamp',
      description: 'Build production-ready AI features from scratch'
    },
    {
      title: 'Cloud Architecture Patterns',
      description: 'Multi-cloud design & Infrastructure as Code'
    },
    {
      title: 'CI/CD Best Practices',
      description: 'Automated testing, deployment & monitoring'
    }
  ];

  getColorClasses(color: string): { bg: string; text: string; hover: string; badge: string } {
    const colors: Record<string, { bg: string; text: string; hover: string; badge: string }> = {
      green: {
        bg: 'bg-green-600',
        text: 'text-green-600',
        hover: 'hover:bg-green-700',
        badge: 'bg-green-50'
      },
      orange: {
        bg: 'bg-orange-600',
        text: 'text-orange-600',
        hover: 'hover:bg-orange-700',
        badge: 'bg-orange-50'
      },
      blue: {
        bg: 'bg-blue-600',
        text: 'text-blue-600',
        hover: 'hover:bg-blue-700',
        badge: 'bg-blue-50'
      }
    };
    return colors[color] || colors['blue'];
  }
}
