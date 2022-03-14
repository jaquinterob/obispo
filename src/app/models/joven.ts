export interface Joven {
  _id: string;
  name: string;
  lastName: string;
  dob: Date;
  phone: string;
  gender: string;
  wishes: number;
  talents: number;
  concerns: number;
  ministrations: number;
  lastMinistration?: Date;
}
