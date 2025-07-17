import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Api } from '../services/api';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink,NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  errorMessage: string = '';

  constructor(private api: Api, private router: Router) {}

  AddLogin(form: NgForm) {
    const data = form.value;
    this.errorMessage = ''; // Reset error message before each request

   this.api.GetLoginData(data).subscribe({
  next: (response: any) => {
    if (response.error) {
      this.errorMessage = response.error === 'Email not found'
        ? 'Email does not exist. Please sign up first.'
        : 'Invalid email or password.';
    } else {
      console.log('Login successful:', response);
      console.log('Login Response:', response.email);

     localStorage.setItem('email', response?.email || data.email);
     localStorage.setItem('password', data.email); 


      this.router.navigate(['/Main']);
    }
  },
  error: err => {
    console.log('Login failed:', err);
    this.errorMessage = 'Something went wrong. Please try again.';
  }
});
  }

  resetGmail() {
    this.errorMessage='';
  }
}
