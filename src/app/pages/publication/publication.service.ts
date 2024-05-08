import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from './publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private http: HttpClient) {}

  getAllPublications(page: number = 1, limit: number = 8): Observable<Publication[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<Publication[]>('http://localhost:3010/publication', { params });
  }

  getPublicationCount(): Observable<number> {
    return this.http.get<number>('http://localhost:3010/publication/count');
  }
}
