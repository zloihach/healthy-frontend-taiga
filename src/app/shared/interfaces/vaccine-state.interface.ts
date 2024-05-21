import { Vaccine } from './vaccine.interface';

export interface VaccineStateInterface {
  userVaccinations: Vaccine[];
  children: any[];
  childrenVaccinations: { [key: number]: Vaccine[] };
  error: any;
}
