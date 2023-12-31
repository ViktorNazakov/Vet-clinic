import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class AuthService {
  BASE_ENDPOINT = environment.endpoint;
  registerAccount = (
    username: String,
    email: String,
    password: String,
    fName: string,
    lName: string,
    phoneNumber?: string
  ) =>
    this.http.post(
      this.BASE_ENDPOINT + 'auth/register',
      JSON.stringify({
        username,
        email,
        password,
        fName,
        lName,
        phoneNumber,
      }),
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  loginAccount = (username: String, password: String) =>
    this.http.post(
      this.BASE_ENDPOINT + 'auth/login',
      JSON.stringify({
        username,
        password,
      }),
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  constructor(private http: HttpClient) {}
}
