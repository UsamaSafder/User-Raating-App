import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Api } from '../services/api';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  emailExists: boolean = false; // Flag for already registered email
  constructor(private api: Api, private router: Router) {}

  addDetails(form: NgForm) {
    if (form.invalid) {
      return; // Prevent submission if form is invalid
    }

    const formData = form.value;

    this.api.PostSignUpData(formData).subscribe({
      next: (response: any) => {
        if (response.error === 'Email already registered.') {
          this.emailExists = true;
        } else {
          this.emailExists = false;
          console.log('SignUp successful:', response);
          this.router.navigate(['/Login']);
        }
      },
      error: err => {
        console.error('Signup error:', err);
      }
    });
  }

  resetEmailExists() {
  this.emailExists = false;
}

}
