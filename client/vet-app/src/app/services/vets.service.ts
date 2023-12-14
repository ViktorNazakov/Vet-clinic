import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class VetsService {
  BASE_ENDPOINT = environment.endpoint;
  getVetsList = () => this.http.get(this.BASE_ENDPOINT + 'users/vets');
  constructor(private http: HttpClient) {}
}
