import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username, password): Observable<any[]> {
    let body = { username: username, password: password };
    let bodyString = JSON.stringify(body); // Stringify payload
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    console.log(bodyString);
    return this.http.post<any[]>('http://127.0.0.1:8000/login/', bodyString, httpOptions);
  }
}
