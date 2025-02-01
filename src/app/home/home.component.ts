import { Component } from '@angular/core';
import { HeaderModule } from '../header/header.module';


@Component({
  selector: 'app-home',
  imports: [HeaderModule], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
}
