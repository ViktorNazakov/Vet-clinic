import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  BASE_ENDPOINT = environment.endpoint;
  getUserProfile = () => this.http.get(this.BASE_ENDPOINT + 'users');
  editUserProfile = (
    userId: string,
    fname?: string,
    lname?: string,
    phoneNumber?: string
  ) =>
    this.http.patch(this.BASE_ENDPOINT + `users?userId=${userId}`, {
      fname,
      lname,
      phoneNumber,
    });
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
  editUserPet = (id: string, name?: string, breed?: string, specie?: string) =>
    this.http.patch(
      this.BASE_ENDPOINT + `users/pets?petId=${id}`,
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
    this.http.delete(this.BASE_ENDPOINT + `users/pets?&petId=${petId}`);
  getUserAppointents = () => this.http.get(this.BASE_ENDPOINT + 'users/visits');
  createAppointment = (
    time: Date,
    description: string,
    pet: string,
    vet: string
  ) =>
    this.http.post(
      this.BASE_ENDPOINT + 'visits',
      JSON.stringify({
        date: `${time.getFullYear()}-${('' + (time.getMonth() + 1)).padStart(
          2,
          '0'
        )}-${('' + time.getDate()).padStart(2, '0')}`,
        time: `${('' + time.getHours()).padStart(2, '0')}:${(
          '' + time.getMinutes()
        ).padStart(2, '0')}:00`,
        description,
        pet: {
          id: pet,
        },
        vet: {
          id: vet,
        },
      }),
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  constructor(private http: HttpClient) {}
}
