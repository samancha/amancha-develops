import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderModule as CoreUIHeaderModule } from '@coreui/angular'; // Import CoreUI HeaderModule


@NgModule({
//   declarations: [HeaderComponent],
  imports: [
    CommonModule,
    CoreUIHeaderModule,
    HeaderComponent
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }