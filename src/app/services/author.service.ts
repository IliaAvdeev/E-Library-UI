import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Author } from '../model/author';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorService {

  private authorsUrl: string;

  constructor(private http: HttpClient) {
    this.authorsUrl = 'http://localhost:5200/authors';
  }

  public findAll(): Observable<Author[]> {
    return this.http.get<Author[]>(this.authorsUrl);
  }

  public findPaginated(page?: number, size?: number): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.authorsUrl}?page=${page}&size=${size}`);
  }

  public findOne(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.authorsUrl}/${id}`);
  }

  public save(author: Author) {
    return this.http.post<Author>(this.authorsUrl, author);
  }

  public delete(id: number) {
    return this.http.delete<Author>(`${this.authorsUrl}/${id}`);
  }

  public update(author: Author, id: number) {
    return this.http.put<Author>(`${this.authorsUrl}/${id}`, author);
  }
}
