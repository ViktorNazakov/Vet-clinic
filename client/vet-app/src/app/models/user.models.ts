export interface Treatment {
  from: Date;
  to: Date;
  medicaments: string[];
}
export interface Pet {
  specie: string;
  name: string;
  _id: string;
}
export interface Appointment {
  time: Date;
  doctor: string;
  _id: string;
}
export interface Vet {
  name: string;
  specialty: string;
  _id: string;
}
