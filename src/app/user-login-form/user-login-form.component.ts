import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Validators} from '@angular/forms';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent {
  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  hidePassword = true;
  errorMessage = 'Введите корректное значение';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  login() {
    const form = this.userForm.value;

    if (form.email && form.password) {
      this.authService.login(form.email, form.password)
        .subscribe(
          () => {
            this.router.navigateByUrl("/")
              .then(() =>
                window.location.reload()
              );
          }
        );
    }
  }
}
