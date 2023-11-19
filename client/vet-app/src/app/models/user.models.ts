export interface Treatment {
  from: Date;
  to: Date;
  medicaments: string[];
}
export interface Pet {
  specie: string;
  name: string;
  id: string;
}
export interface Appointment {
  time: Date;
  doctor: string;
  id: string;
}
export interface Vet {
  name: string;
  specialty: string;
  id: string;
}
export interface User {
  username: string;
  lname: string;
  fname: string;
  phoneNumber: string;
  email: string;
}
