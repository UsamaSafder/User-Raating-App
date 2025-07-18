

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  
  constructor(private http: HttpClient) {}

  PostSignUpData(data: any): Observable<any> {
    const url = "https://hmftj.com/interns/UApi/singupp.php";
    return this.http.post(url, data);
  }

 GetLoginData(data: any): Observable<any> {
  const url = "https://hmftj.com/interns/UApi/login.php";
  return this.http.post<any>(url, data);
}

  GetComments(): Observable<any> {
  const url = "https://hmftj.com/interns/UApi/submit_rating.php";
  return this.http.get(url); 
}

PostComment(data: any): Observable<any> {
  const url = "https://hmftj.com/interns/UApi/submit_rating.php";
  return this.http.post(url, data);
}

}