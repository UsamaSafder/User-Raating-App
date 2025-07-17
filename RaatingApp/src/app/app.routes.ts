import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { MainApp } from './main-app/main-app';

export const routes: Routes = [
    { path: 'Login', component: Login },
    { path: 'Signup', component: Signup }, // <-- Add this line
    {path:'Main',component:MainApp},
    { path: '', redirectTo: 'Login', pathMatch: 'full' } // Optional: default to signup
];
