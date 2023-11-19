import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.models';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  BASE_ENDPOINT = environment.endpoint;
  tempUsers: User[] = [
    {
      email: 'testuser@mail.bg',
      fname: 'johny',
      lname: 'lennon',
      phoneNumber: '0885823432',
      username: 'ewkjkwewf',
    },
  ];
  getUsers = () => of(this.tempUsers);

  //Replace Later
  //   this.http.get(this.BASE_ENDPOINT + 'admin/users');
  constructor(private http: HttpClient, private store: Store) {}
}
