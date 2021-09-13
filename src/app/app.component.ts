import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  username: string;

  constructor(private authService: AuthService) {
    this.title = 'BOOKWARM';
    if (this.isLoggedIn()) {
      this.username = this.authService.getUser().sub;
    } else {
      this.username = "Гость"
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
