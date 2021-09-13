import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Genre} from '../model/genre';
import {Observable} from 'rxjs';

@Injectable()
export class GenreService {

  private genresUrl: string;
  private adminUrl: string;

  constructor(private http: HttpClient) {
    this.genresUrl = 'http://localhost:5200/genres';
    this.adminUrl = 'http://localhost:5200/admin/genres'
  }

  public findAll(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.genresUrl);
  }

  public findPaginated(page?: number, size?: number): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.genresUrl}?page=${page}&size=${size}`);
  }

  public findOne(id: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.genresUrl}/${id}`);
  }

  public save(genre: Genre) {
    return this.http.post<Genre>(`${this.adminUrl}/create`, genre);
  }

  public deleteAll(ids: number[]) {
    return this.http.post<Genre[]>(`${this.adminUrl}/delete/mutiple`, ids)
  }
}
