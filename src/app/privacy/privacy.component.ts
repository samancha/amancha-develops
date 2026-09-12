import { Component } from '@angular/core';
import { NavigationComponent } from '../shared/components/navigation/navigation.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [NavigationComponent, FooterComponent],
  templateUrl: './privacy.component.html'
})
export class PrivacyComponent {}
