import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { Medicament, Pet, User } from '../models/user.models';

@Injectable({ providedIn: 'root' })
export class AdminService {
  BASE_ENDPOINT = environment.endpoint;
  getUsers = () => this.http.get(this.BASE_ENDPOINT + 'admin/users');
  deleteUser = (uId: string) =>
    this.http.delete(this.BASE_ENDPOINT + `admin/users?userId=${uId}`);
  editUser = (user: Partial<User>) =>
    this.http.patch(this.BASE_ENDPOINT + `users?userId=${user?.id}`, {
      lname: user.lname,
      fname: user.fname,
      phoneNumber: user.phoneNumber,
      email: user.email,
    });
  getMeds = () => this.http.get(this.BASE_ENDPOINT + 'meds');
  createMed = (med: Medicament) =>
    this.http.post(this.BASE_ENDPOINT + 'meds', {
      name: med.name,
      type: med.type,
      quantity: med.quantity,
      description: med.description,
    });
  deleteMed = (medId: string) =>
    this.http.delete(this.BASE_ENDPOINT + `meds?medId=${medId}`);
  editMed = (med: Medicament) =>
    this.http.patch(this.BASE_ENDPOINT + `meds?medId=${med.id}`, { ...med });
  getUserPets = (uId: string) =>
    this.http.get(this.BASE_ENDPOINT + `admin/users/${uId}/pets`);
  editUserPet = (pet: Pet) =>
    this.http.patch(this.BASE_ENDPOINT + `users/pets?petId=${pet.id}`, {
      specie: pet.specie,
      breed: pet.breed,
      name: pet.name,
    });
  constructor(private http: HttpClient, private store: Store) {}
}
