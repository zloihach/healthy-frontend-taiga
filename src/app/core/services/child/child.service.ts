// src/app/core/services/child/child.service.ts
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
    return this.http.post<any>(this.childrenApiUrl, child);
  }
}
