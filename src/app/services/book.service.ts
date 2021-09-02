import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../model/book';
import { Observable } from 'rxjs';

@Injectable()
export class BookService {

  private booksUrl: string;

  constructor(private http: HttpClient) {
    this.booksUrl = 'http://localhost:5200/books';
  }

  public findAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl);
  }

  public findPaginated(page?: number, size?: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.booksUrl}?page=${page}&size=${size}`);
  }

  public findOne(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.booksUrl}/${id}`);
  }

  public findByAuthorId(authorId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.booksUrl}/author/${authorId}`);
  }

  public save(book: Book) {
    return this.http.post<Book>(this.booksUrl, book);
  }

  public delete(id: number) {
    return this.http.delete<Book>(`${this.booksUrl}/${id}`);
  }

  public deleteAll(ids: number[]) {
    return this.http.post<Book[]>(`${this.booksUrl}/bulkDelete`, ids);
  }

  public update(book: Book, id: number) {
    return this.http.put<Book>(`${this.booksUrl}/${id}`, book);
  }
}
