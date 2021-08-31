import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  findOne(id: number): Observable<Cycle> {
    return this.http.get<Cycle>(`${this.cyclesUrl}/${id}`);
  }

  public save(cycle: Cycle) {
    return this.http.post<Cycle>(this.cyclesUrl, cycle);
  }
}