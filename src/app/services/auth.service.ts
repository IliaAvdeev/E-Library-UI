import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from "../model/user";
import {map} from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import {UserService} from "./user.service";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private userService: UserService) {
  }

  login(email: string, password: string) {
    return this.userService.authenticate(email, password)
      .pipe(
        map(res => this.setSession(res))
      )
  }

  private setSession(authResult: any) {
    const parsedToken = this.parseJwt(authResult.token);

    localStorage.setItem("user", JSON.stringify(parsedToken));
    localStorage.setItem("user_token", authResult.token);
  }

  private parseJwt(token: string) {
    return jwt_decode<User>(token);
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("user_token");
    window.location.reload();
  }

  public isLoggedIn() {
    return (this.getUser() != null) && (moment().isBefore(this.getExpiration()));
  }

  public isAdmin() {
    return (this.isLoggedIn() && this.getUser().role == "ROLE_ADMIN");
  }

  getUser(): User {
    return JSON.parse(<string>localStorage.getItem("user"));
  }

  getExpiration() {
    if (this.getUser() != null) {
      return moment.unix(this.getUser().exp);
    }
    return null;
  }
}
