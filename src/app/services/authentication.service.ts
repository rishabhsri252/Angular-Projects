import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCredential } from '../types/types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userApiUrl = '../assets/users.json';
  userName = '';
  constructor(private http: HttpClient) {}

  authenticate(username: string) {
    this.userName = username;
    return this.http
      .get(this.userApiUrl, { responseType: 'text' })
      .pipe(map((res) => JSON.parse(res) as UserCredential));
  }

  getUserName() {
    return this.userName;
  }
}
