export interface Treatment {
  from: Date;
  to: Date;
  medicaments: string[];
}
export interface Pet {
  specie: string;
  breed: string;
  name: string;
  id: string;
}
export interface Appointment {
  time: Date;
  doctor: string;
  id: string;
}

export interface User {
  username: string;
  lname: string;
  fname: string;
  phoneNumber: string;
  email: string;
  role?: string;
  id?: string;
  userId?: string;
}
export interface Vet extends User {
  vetType: string;
}
export interface Medicament {
  name: string;
  type: string;
  description: string;
  quantity: number;
  id?: string;
}
