// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { catchError, switchMap, tap } from 'rxjs/operators';
// import { SessionInfo } from './interfaces/sessionInfo.interface';
// import { Router } from '@angular/router';
// import { SignUpRequest } from "./interfaces/signup.interface";
//
// const AUTH_API = 'http://localhost:3010/auth/';
// const API = 'http://localhost:3010/';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private currentUserSubject: BehaviorSubject<SessionInfo | null>;
//   public currentUser: Observable<SessionInfo | null>;
//
//   constructor(private http: HttpClient, private router: Router) {
//     this.currentUserSubject = new BehaviorSubject<SessionInfo | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
//     this.currentUser = this.currentUserSubject.asObservable();
//     this.fetchSessionInfo();
//   }
//
//   private fetchSessionInfo(): void {
//     this.getSessionInfo().subscribe({
//       next: (sessionInfo) => {
//         this.currentUserSubject.next(sessionInfo);
//         localStorage.setItem('currentUser', JSON.stringify(sessionInfo));
//       },
//       error: (err) => {
//         console.error('Failed to fetch session info', err);
//         this.currentUserSubject.next(null);
//         localStorage.removeItem('currentUser');
//       }
//     });
//   }
//
//   public get currentUserValue(): SessionInfo | null {
//     return this.currentUserSubject.value;
//   }
//
//   login(email: string, password: string): Observable<any> {
//     return this.http.post<any>(`${AUTH_API}sign-in`, { email, password }, { withCredentials: true }).pipe(
//       switchMap(user => this.getSessionInfo()),
//       tap(sessionInfo => {
//         this.currentUserSubject.next(sessionInfo);
//         localStorage.setItem('currentUser', JSON.stringify(sessionInfo));
//       }),
//       catchError(err => {
//         console.error('Login failed!', err);
//         return of(null);
//       })
//     );
//   }
//
//   logout(): Observable<any> {
//     return this.http.post(`${AUTH_API}sign-out`, {}, { withCredentials: true }).pipe(
//       tap(() => {
//         this.currentUserSubject.next(null);
//         localStorage.removeItem('currentUser');
//         this.router.navigate(['/login']).then();
//       }),
//       catchError(err => {
//         console.error('Logout failed', err);
//         return of(null);
//       })
//     );
//   }
//
//   getSessionInfo(): Observable<SessionInfo> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json'
//     });
//     return this.http.post<SessionInfo>(`${AUTH_API}session`, {}, { headers, withCredentials: true });
//   }
//
//   checkEmail(email: string): Observable<boolean> {
//     return this.http.get<boolean>(`${API}users/check-email/${email}`);
//   }
//
//   signUp(signUpRequest: SignUpRequest): Observable<any> {
//     return this.http.post<any>(`${AUTH_API}sign-up`, signUpRequest, { withCredentials: true });
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { SessionInfo } from './interfaces/sessionInfo.interface';
import { Router } from '@angular/router';
import { SignUpRequest } from "./interfaces/signup.interface";

const AUTH_API = 'http://localhost:3010/auth/';
const API = 'http://localhost:3010/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<SessionInfo | null>;
  public currentUser: Observable<SessionInfo | null>;

  constructor(private http: HttpClient, private router: Router) {
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
    return this.http.post<any>(`${AUTH_API}sign-in`, { email, password }, { withCredentials: true }).pipe(
      switchMap(() => this.getSessionInfo()),
      tap(sessionInfo => {
        this.currentUserSubject.next(sessionInfo);
        localStorage.setItem('currentUser', JSON.stringify(sessionInfo));
      }),
      catchError(err => {
        console.error('Login failed!', err);
        return of(null);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${AUTH_API}sign-out`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']).then();
      }),
      catchError(err => {
        console.error('Logout failed', err);
        return of(null);
      })
    );
  }

  getSessionInfo(): Observable<SessionInfo | null> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<SessionInfo>(`${AUTH_API}session`, {}, { headers, withCredentials: true }).pipe(
      catchError(err => {
        console.error('Failed to get session info', err);
        return of(null);  // Возвращаем null в случае ошибки
      })
    );
  }

  checkEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${API}users/check-email/${email}`);
  }

  signUp(signUpRequest: SignUpRequest): Observable<any> {
    return this.http.post<any>(`${AUTH_API}sign-up`, signUpRequest, { withCredentials: true }).pipe(
      switchMap(() => this.getSessionInfo()),
      tap(sessionInfo => {
        this.currentUserSubject.next(sessionInfo);
        localStorage.setItem('currentUser', JSON.stringify(sessionInfo));
      }),
      catchError(err => {
        console.error('Registration failed!', err);
        return of(null);
      })
    );
  }
}
