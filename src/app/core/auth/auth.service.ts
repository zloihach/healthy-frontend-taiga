import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, catchError, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {SessionInfo} from './sessionInfo.interface';

const AUTH_API = 'http://localhost:3010/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<SessionInfo | null>;
  public currentUser: Observable<SessionInfo | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<SessionInfo | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.fetchSessionInfo();
  }

  private fetchSessionInfo(): void {
    this.getSessionInfo().subscribe({
      next: (sessionInfo) => {
        this.currentUserSubject.next(sessionInfo);
        localStorage.setItem('currentUser', JSON.stringify(sessionInfo));
      },
      error: (err) => {
        console.error('Failed to fetch session info', err);
        this.currentUserSubject.next(null);
        localStorage.removeItem('currentUser');
      }
    });
  }

  public get currentUserValue(): SessionInfo | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${AUTH_API}sign-in`, {email, password}, {withCredentials: true})
      .pipe(
        map(user => {
          this.fetchSessionInfo();
          return user;
        }),
        catchError(err => {
          console.error('Login failed', err);
          return of(null);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${AUTH_API}sign-out`, {}, {withCredentials: true}).pipe(
      map(response => {
        this.currentUserSubject.next(null);
        localStorage.removeItem('currentUser');
        return response;
      }),
      catchError(err => {
        console.error('Logout failed', err);
        return of(null);
      })
    );
  }

  getSessionInfo(): Observable<SessionInfo> {
    return this.http.post<SessionInfo>(`${AUTH_API}session`, {}, {withCredentials: true});
  }
}
