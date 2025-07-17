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
      next:  (response: any) => {
        if (response.error) {
       
        console.log('SignUp error:', response.error);
      } else {
        console.log('SignUp successful:', response);
        this.router.navigate(['/Login']);
        }
       
      },
      error: err => {
        console.error('Signup error:', err);
    
      }
    });
  }

    
}