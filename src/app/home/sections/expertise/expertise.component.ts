import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ExpertiseArea {
  title: string;
  icon: string;
  color: string;
  items: string[];
}

@Component({
  selector: 'app-expertise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.css']
})
export class ExpertiseComponent {
  expertiseAreas: ExpertiseArea[] = [
    {
      title: 'Cloud Platforms',
      icon: 'fas fa-cloud',
      color: 'blue',
      items: [
        'AWS (Lambda, S3, CloudWatch)',
        'Azure (Functions, Logic Apps)',
        'Multi-cloud Architecture'
      ]
    },
    {
      title: 'Languages',
      icon: 'fas fa-code',
      color: 'purple',
      items: [
        'Python',
        'C# / ASP.NET',
        'JavaScript / React / Angular'
      ]
    },
    {
      title: 'DevOps',
      icon: 'fas fa-cogs',
      color: 'green',
      items: [
        'Docker / Kubernetes',
        'GitLab CI/CD / Jenkins',
        'OpenTofu / IaC'
      ]
    },
    {
      title: 'AI & Data',
      icon: 'fas fa-robot',
      color: 'orange',
      items: [
        'Azure AI Services',
        'AWS SageMaker',
        'PostgreSQL / CosmosDB'
      ]
    }
  ];

  getColorBorder(color: string): string {
    const borders: Record<string, string> = {
      blue: 'border-blue-100',
      purple: 'border-purple-100',
      green: 'border-green-100',
      orange: 'border-orange-100'
    };
    return borders[color] || 'border-blue-100';
  }

  getColorGradient(color: string): string {
    const gradients: Record<string, string> = {
      blue: 'from-blue-50',
      purple: 'from-purple-50',
      green: 'from-green-50',
      orange: 'from-orange-50'
    };
    return gradients[color] || 'from-blue-50';
  }

  getIconColor(color: string): string {
    const iconColors: Record<string, string> = {
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      green: 'text-green-600',
      orange: 'text-orange-600'
    };
    return iconColors[color] || 'text-blue-600';
  }
}
