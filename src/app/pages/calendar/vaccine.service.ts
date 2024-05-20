import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  private userApiUrl = 'http://localhost:3010/vaccination/user-vaccinations';
  private childrenApiUrl = 'http://localhost:3010/children/all';

  constructor(private http: HttpClient) {}

  getUserVaccinations(): Observable<any> {
    console.log('VaccineService: getUserVaccinations called');

    return this.http.post<any>(this.userApiUrl,{}, { withCredentials: true });
  }

  getChildren(): Observable<any[]> {
    console.log('VaccineService: getChildren called');
    return this.http.post<any[]>(this.childrenApiUrl,{}, { withCredentials: true });
  }
}
