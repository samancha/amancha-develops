import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { FullCalendarComponent } from '@fullcalendar/angular';



@NgModule({
//   declarations: [HeaderComponent],
  imports: [
    CommonModule,
    FullCalendarComponent
  ],
  exports: [CalendarComponent]
})
export class HeaderModule { }