import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Api } from '../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  constructor(private api: Api, private router: Router) {}

  addDetails(form: NgForm) {
    const formData = form.value;
    this.api.PostSignUpData(formData).subscribe({
      next: response => {
        console.log('Signup response:', response);
        // Optionally navigate or show a message here
      },
      error: err => {
        console.error('Signup error:', err);
        // Optionally show an error message to the user
      }
    });
  }

    goToLoginPage() {
    this.router.navigate(['/Login']);
  }
}