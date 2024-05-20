import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  private userApiUrl = 'http://localhost:3010/vaccination/user-vaccinations';
  private childrenApiUrl = 'http://localhost:3010/children';

  constructor(private http: HttpClient) {}

  getUserVaccinations(): Observable<any> {
    return this.http.get<any>(this.userApiUrl, { withCredentials: true });
  }

  getChildren(): Observable<any[]> {
    return this.http.get<any[]>(this.childrenApiUrl,{withCredentials: true});
  }
}
