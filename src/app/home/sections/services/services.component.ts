import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceCard {
  title: string;
  icon: string;
  color: string;
  borderColor: string;
  items: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services: ServiceCard[] = [
    {
      title: 'AI Integration',
      icon: 'fas fa-brain',
      color: 'bg-blue-600',
      borderColor: 'border-blue-100',
      items: [
        'Document processing & data extraction',
        'Generative AI content systems',
        'ML pipeline design & deployment',
        'AI vendor evaluation & integration'
      ]
    },
    {
      title: 'Cloud Transformation',
      icon: 'fas fa-cloud',
      color: 'bg-indigo-600',
      borderColor: 'border-indigo-100',
      items: [
        'AWS & Azure architecture design',
        'Multi-cloud migration strategy',
        'Infrastructure as Code (IaC)',
        'Cost optimization & monitoring'
      ]
    },
    {
      title: 'Proof of Concepts',
      icon: 'fas fa-clipboard-check',
      color: 'bg-purple-600',
      borderColor: 'border-purple-100',
      items: [
        'Technical feasibility assessments',
        'Rapid prototype development',
        'Cloud architecture audits',
        'Technology stack recommendations'
      ]
    }
  ];
}
