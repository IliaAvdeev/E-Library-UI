import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Genre } from '../model/genre';
import { Observable } from 'rxjs';

@Injectable()
export class GenreService {

  private genresUrl: string;

  constructor(private http: HttpClient) {
    this.genresUrl = 'http://localhost:5200/genres';
  }

  public findAll(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.genresUrl);
  }

  findOne(id: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.genresUrl}/${id}`);
  }

  public save(genre: Genre) {
    return this.http.post<Genre>(this.genresUrl, genre);
  }
}
