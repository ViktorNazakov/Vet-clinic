import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  setToken = (token: string) => {
    localStorage.setItem('vet_token', token);
  };
  getToken = () => localStorage.getItem('vet_token');
  setItem = (loc: string, val: string) => {
    localStorage.setItem('vet_' + loc, val);
  };
  getItem = (loc: string) => localStorage.getItem('vet_' + 'loc');
}
