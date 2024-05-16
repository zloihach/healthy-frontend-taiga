import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vaccine} from '../../shared/interfaces/vaccine.interface';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  private apiUrl = 'http://localhost:3010/vaccination/user-vaccinations';

  constructor(private http: HttpClient) {
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    console.log(`Getting cookie ${name}:`, match ? decodeURIComponent(match[2]) : null);
    return match ? decodeURIComponent(match[2]) : null;
  }

  getAllVaccinationsForCurrentUser(): Observable<Vaccine[]> {
    console.log('Sending request to get vaccinations');

    const authToken = this.getCookie('access-token');
    if (!authToken) {
      console.error('Auth token not found in cookies');
    }

    const headers = new HttpHeaders({
      'Cookie': `access-token=${authToken}`
    });

    return this.http.post<Vaccine[]>(this.apiUrl, {headers}, {withCredentials: true});
  }
}
