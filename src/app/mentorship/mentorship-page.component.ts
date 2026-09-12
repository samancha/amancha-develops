import { Component } from '@angular/core';
import { NavigationComponent } from '../shared/components/navigation/navigation.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { MentorshipComponent } from '../home/sections/mentorship/mentorship.component';

@Component({
  selector: 'app-mentorship-page',
  standalone: true,
  imports: [NavigationComponent, FooterComponent, MentorshipComponent],
  template: '<app-navigation></app-navigation><main class="pt-16"><app-mentorship></app-mentorship></main><app-footer></app-footer>'
})
export class MentorshipPageComponent {}
