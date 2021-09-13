import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from '../model/book';
import {Observable} from 'rxjs';

@Injectable()
export class BookService {

  private booksUrl: string;
  private adminUrl: string;

  constructor(private http: HttpClient) {
    this.booksUrl = 'http://localhost:5200/books';
    this.adminUrl = 'http://localhost:5200/admin/books';
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

  public findByGenreId(genreId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.booksUrl}/genre/${genreId}`);
  }

  public findByCycleId(cycleId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.booksUrl}/cycle/${cycleId}`);
  }

  public save(book: Book) {
    return this.http.post<Book>(`${this.adminUrl}/create`, book);
  }

  public delete(id: number) {
    return this.http.delete<Book>(`${this.adminUrl}/delete/${id}`);
  }

  public deleteAll(ids: number[]) {
    return this.http.post<Book[]>(`${this.adminUrl}/delete/multiple`, ids);
  }

  public update(book: Book, id: number) {
    return this.http.put<Book>(`${this.adminUrl}/update/${id}`, book);
  }
}
