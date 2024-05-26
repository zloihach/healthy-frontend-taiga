import { VaccineType } from "../enums/vaccine-type.enum";

export interface Vaccine {
  id: number;
  vaccine_id: number;
  user_id: number;
  medical_center: string;
  dose: number;
  serial_number: string;
  vaccination_date: string;
  commentary: string;
  is_vaccinated: boolean | null;
  planned_vaccination_date: string;
  created_at: string;
  updated_at: string;
  vaccine: {
    name: string;
    type: VaccineType;
  };
}
