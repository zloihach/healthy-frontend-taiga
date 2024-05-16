import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaccine } from '../../shared/interfaces/vaccine.interface';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  private apiUrl = 'http://localhost:3010/vaccination/user-vaccinations';

  constructor(private http: HttpClient) {}

  getAllVaccinationsForCurrentUser(): Observable<Vaccine[]> {
    console.log('Sending request to get vaccinations'); // Log before sending request
    return this.http.get<Vaccine[]>(this.apiUrl);
  }
}
