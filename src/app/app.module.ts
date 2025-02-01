import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// app.module.ts
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        // AppRoutingModule,
        // CoreModule
        NgbModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }