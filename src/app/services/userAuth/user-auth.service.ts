// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:3001/register';
  private loginUrl = 'http://localhost:3001/login';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }

  login(credentials: { Email: string, Password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials);
  }
}
