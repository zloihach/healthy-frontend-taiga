import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {VaccineMark} from "../../../shared/interfaces/vaccine-mark.interface";

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  private userApiUrl = 'http://localhost:3010/vaccination/user-vaccinations';
  private childrenApiUrl = 'http://localhost:3010/children';
  private baseUrl = 'http://localhost:3010/vaccination';

  constructor(private http: HttpClient) {}

  getUserVaccinations(): Observable<any> {
    return this.http.get<any>(this.userApiUrl, { withCredentials: true });
  }

  getChildren(): Observable<any[]> {
    return this.http.get<any[]>(this.childrenApiUrl, { withCredentials: true });
  }

  updateVaccine(vaccination: VaccineMark): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/update`, vaccination);
  }

  getChildVaccinations(childId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3010/children/${childId}`);
  }

  updateChildVaccination(childId: number, vaccinationId: number, vaccination: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3010/children/${childId}/vaccinations/${vaccinationId}`, vaccination);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>('http://localhost:3010/auth/get-me', { withCredentials: true });
  }
}
