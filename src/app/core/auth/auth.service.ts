import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {SessionInfo} from "./sessionInfo.interface";

const AUTH_API = 'http://localhost:3010/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${AUTH_API}sign-in`, { email, password }, { withCredentials: true })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout(): Observable<any> {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return this.http.post(`${AUTH_API}sign-out`, {}, { withCredentials: true }).pipe(
      map(response => {
        return response;
      })
    );
  }
  getSessionInfo(): Observable<SessionInfo> {
    return this.http.get<SessionInfo>(`${AUTH_API}session`, { withCredentials: true });
  }
}
