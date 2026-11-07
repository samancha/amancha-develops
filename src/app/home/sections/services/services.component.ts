import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bookingUrl } from '../../../shared/config/site.config';

interface AuditStep {
  title: string;
  cardClass: string;
  numberClass: string;
  chevronClass: string;
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
  readonly bookingUrl = bookingUrl;
  readonly auditSteps: AuditStep[] = [
    {
      title: 'I watch how the work really happens',
      cardClass: 'bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition border-blue-100',
      numberClass: 'bg-blue-600',
      chevronClass: 'text-blue-600',
      items: [
        'Time with the people closest to the work',
        'A shared view of the goals, constraints, and opportunities'
      ]
    },
    {
      title: 'You get a clear map of what is happening',
      cardClass: 'bg-gradient-to-br from-indigo-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition border-indigo-100',
      numberClass: 'bg-indigo-600',
      chevronClass: 'text-indigo-600',
      items: [
        'By workflow, system, and handoff',
        'A practical view of what is helping and what is getting in the way'
      ]
    },
    {
      title: 'The five fastest fixes, ranked',
      cardClass: 'bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition border-purple-100',
      numberClass: 'bg-purple-600',
      chevronClass: 'text-purple-600',
      items: [
        'Expected impact and effort',
        'Risk, dependencies, and a sensible sequence'
      ]
    },
    {
      title: 'I build one of them and hand it over working',
      cardClass: 'bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition border-green-100',
      numberClass: 'bg-green-600',
      chevronClass: 'text-green-600',
      items: [
        'Not a recommendation',
        'A working improvement your team can use and understand'
      ]
    },
    {
      title: 'A plan for what comes next',
      cardClass: 'bg-gradient-to-br from-orange-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition border-orange-100',
      numberClass: 'bg-orange-600',
      chevronClass: 'text-orange-600',
      items: [
        'Continue with me, someone else, or in-house',
        'Keep the next improvements moving'
      ]
    }
  ];
}
