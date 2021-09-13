import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:5200/users';
  }

  public register(user: User) {
    return this.http.post<any>(`${this.usersUrl}/register`, user, {observe: 'response'});
  }

  public authenticate(email: string, password: string) {
    return this.http.post<any>(`${this.usersUrl}/login`, {email, password});
  }
}
