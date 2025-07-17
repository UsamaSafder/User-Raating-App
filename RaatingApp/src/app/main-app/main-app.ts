import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // ✅ Missing
import { Api } from '../services/api';
import { FormsModule, NgModel } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-main-app',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor],
  templateUrl: './main-app.html',
  styleUrl: './main-app.css'
})
export class MainApp {
  StarNumber = 0;
  name = '';
  message = '';
  stars = [1, 2, 3, 4, 5];

  messages: { name: string; comment: string; rating: number }[] = [];

  // ✅ Inject both HttpClient and Api
  constructor(private http: HttpClient, private api: Api) {
    this.loadReviews(); 
  }

  // ✅ Submit message via API service
submitMessage() {
  console.log('Send button clicked');

  const email = localStorage.getItem('email');

  console.log('Name:', this.name);
  console.log('Email:', email);
  console.log('StarNumber:', this.StarNumber);
  console.log('Message:', this.message);

  if (!email) {
    console.log('No logged-in email found. Please log in first.');
    alert('Please log in before submitting a review.');
    return;
  }

  if (!this.name || !this.StarNumber || !this.message.trim()) {
    console.log('Validation failed');
    alert('Please fill in all fields and select a rating.');
    return;
  }

  const review = {
    email: email, // Always use logged-in email
    name: this.name,
    rating: this.StarNumber,
    comment: this.message.trim()
  };

  console.log('Review to be sent:', review);

  this.api.PostComment(review).subscribe({
    next: () => {
      console.log('Review posted successfully');
      this.name = '';
      this.message = '';
      this.StarNumber = 0;

      const stars = document.querySelectorAll('.stars');
      stars.forEach((star) => {
        (star as HTMLElement).style.color = 'white';
      });

      this.loadReviews(); // Refresh list
    },
    error: (err) => {
      console.error('Submit failed:', err);
      alert('Failed to submit review. Try again.');
    }
  });
}



  // ✅ Load all reviews from backend
  loadReviews() {
  this.api.GetComments().subscribe({
    next: (data) => {
      console.log('Reviews loaded:', data); // ✅ Make sure it logs
      this.messages = data.reviews;

    },
    error: (err) => console.error('Failed to load reviews:', err)
  });
}


  // ✅ Rating logic (UI only)
  rate(el: HTMLElement, star: number) {
    this.StarNumber = star;

    const stars = document.querySelectorAll('.stars');
    stars.forEach((element, index) => {
      (element as HTMLElement).style.color = index < star ? 'red' : 'white';
    });
  }
}
