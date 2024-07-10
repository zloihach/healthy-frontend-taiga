import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from './publication';

export interface CreatePublicationBodyDto {
  short_title: string;
  full_title: string;
  text: string;
  image_url?: string | File;
  is_active: boolean;
}

export interface EditPublicationBodyDto {
  id: string;
  short_title?: string;
  full_title?: string;
  text?: string;
  image_url?: string | File;
  is_active?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private apiUrl = 'http://localhost:3010';

  constructor(private http: HttpClient) {}

  getAllPublications(page: number = 1, limit: number = 8): Observable<Publication[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<Publication[]>(`${this.apiUrl}/publication`, { params });
  }

  getPublicationCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/publication/count`);
  }

  getPublicationById(publicationId: string): Observable<Publication> {
    return this.http.get<Publication>(`${this.apiUrl}/publication/get/${publicationId}`);
  }

  createPublication(data: FormData): Observable<Publication> {
    return this.http.post<Publication>(`${this.apiUrl}/publication/create`, data);
  }

  editPublication(data: FormData): Observable<Publication> {
    return this.http.patch<Publication>(`${this.apiUrl}/publication/edit`, data);
  }

  deletePublication(publicationId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/publication/delete/${publicationId}`);
  }
}
