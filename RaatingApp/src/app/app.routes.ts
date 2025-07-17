import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';

export const routes: Routes = [
    { path: 'Login', component: Login },
    { path: 'Signup', component: Signup }, // <-- Add this line
    { path: '', redirectTo: 'Signup', pathMatch: 'full' } // Optional: default to signup
];
