import { Routes } from '@angular/router';
import {SoftwarePgComponent} from './software-pg/software-pg.component'
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// can do nested compontents
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'software', component: SoftwarePgComponent },
    { path: 'mentorship', loadComponent: () => import('./mentorship/mentorship-page.component').then((module) => module.MentorshipPageComponent) },
    { path: 'privacy', loadComponent: () => import('./privacy/privacy.component').then((module) => module.PrivacyComponent) },
    { path: '**', component: PageNotFoundComponent }, 
    // { path: ‘dashboard’, component: DashboardComponent },
    // { path: ‘products’, component: ProductsComponent, children: [
    //    { path: ‘top’, component: TopProductsComponent },
    //  { path: ‘:id’, component: ProductDetailsComponent }
    // ]},
    // { path: ‘’, redirectTo: ‘/dashboard’, pathMatch: ‘full’ },
    // { path: ‘**’, component: PageNotFoundComponent }
];
