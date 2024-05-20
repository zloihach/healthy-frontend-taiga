import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Vaccine} from "../../shared/interfaces/vaccine.interface";

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  private apiUrl = 'http://localhost:3010/vaccination/user-vaccinations';
  private childApiUrl = 'http://localhost:3010/children/all';

  constructor(private http: HttpClient) {}

  getAllVaccinationsForCurrentUser(): Observable<Vaccine[]> {
    return this.http.post<Vaccine[]>(this.apiUrl, {}, { withCredentials: true });
  }

  getUsersAndChildren(): Observable<any[]> {
    return this.http.post<any[]>(this.childApiUrl, {}, { withCredentials: true });
  }
}
