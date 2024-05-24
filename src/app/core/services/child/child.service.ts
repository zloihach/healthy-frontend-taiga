import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  private childrenApiUrl = 'http://localhost:3010/children';

  constructor(private http: HttpClient) {}

  addChild(child: any): Observable<any> {
    return this.http.post<any>(this.childrenApiUrl, child, { withCredentials: true });
  }

  deleteChild(childId: number): Observable<any> {
    return this.http.delete<any>(`${this.childrenApiUrl}/${childId}`, { withCredentials: true });
  }

  getChildren(): Observable<any[]> {
    return this.http.get<any[]>(this.childrenApiUrl, { withCredentials: true });
  }
}
