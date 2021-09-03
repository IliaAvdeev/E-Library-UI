import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:5200/users';
  }

  public findByEmail(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}?email=${email}&password=${password}`);
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }
}
