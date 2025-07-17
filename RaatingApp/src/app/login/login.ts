import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Api } from '../services/api';
import { Router } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private api: Api, private router: Router) {}

  
AddLogin(form: NgForm) {
  const data = form.value;
  this.api.GetLoginData(data).subscribe({
    next: (response: any) => {
      if (response.error) {
        // Show error to user
        console.log('Login error:', response.error);
      } else {
        console.log('Login successful:', response);
        this.router.navigate(['/Main']);
      }
    },
    error: err => {
      console.log('Error: Login not successful', err);
    }
  });
}

  

}
