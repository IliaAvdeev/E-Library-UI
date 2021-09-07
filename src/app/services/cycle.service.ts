import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cycle } from '../model/cycle';
import { Observable } from 'rxjs';

@Injectable()
export class CycleService {

  private cyclesUrl: string;

  constructor(private http: HttpClient) {
    this.cyclesUrl = 'http://localhost:5200/cycles';
  }

  public findAll(): Observable<Cycle[]> {
    return this.http.get<Cycle[]>(this.cyclesUrl);
  }

  public findPaginated(page?: number, size?: number): Observable<Cycle[]> {
    return this.http.get<Cycle[]>(`${this.cyclesUrl}?page=${page}&size=${size}`);
  }

  public findOne(id: number): Observable<Cycle> {
    return this.http.get<Cycle>(`${this.cyclesUrl}/${id}`);
  }

  public save(cycle: Cycle) {
    return this.http.post<Cycle>(this.cyclesUrl, cycle);
  }

  public deleteAll(ids: number[]) {
    return this.http.post<Cycle[]>(`${this.cyclesUrl}/bulkDelete`, ids);
  }
}
