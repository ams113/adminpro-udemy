import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { ProgressComponent } from './pages/progress/progress.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NopageComponent } from './shared/nopage/nopage.component';
import { RegisterComponent } from './login/register.component';


const appRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'graficas1', component: Graficas1Component },
            { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
        ] 
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', pathMatch: 'full', component: NopageComponent }

]

export const APPROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );