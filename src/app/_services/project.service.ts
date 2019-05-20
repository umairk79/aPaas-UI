import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../_models/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Object>{
    return this.http.get<Object>('http://127.0.0.1:8000/projects/')
  }

  postEnvIdentifier(bobId: String, env: string): Observable<Object>{
    let body = { bobId: bobId, env: env };
    let bodyString = JSON.stringify(body); // Stringify payload
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<Object>('http://127.0.0.1:8000/projects/environmentIdentifier', bodyString, httpOptions)
  }
}
