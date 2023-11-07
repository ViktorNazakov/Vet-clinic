import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  BASE_ENDPOINT = environment.endpoint;
  getUserProfile = () => this.http.get(this.BASE_ENDPOINT + 'users');
  getUserPets = () => this.http.get(this.BASE_ENDPOINT + 'users/pets');
  createUserPet = (name: string, specie: string, breed: string) =>
    this.http.post(
      this.BASE_ENDPOINT + 'pets',
      JSON.stringify({
        name,
        specie,
        breed,
      }),
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  deleteUserPet = (petId: string) =>
    this.http.delete(`http://localhost:8080/api/v1/users/pets?&petId=${petId}`);
  constructor(private http: HttpClient) {}
}
