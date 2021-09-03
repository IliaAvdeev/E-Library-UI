import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent {
  userForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  hidePassword = true;
  errorMessage = 'Введите корректное значение';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  onSubmit() {
    this.userService.findByEmail(this.userForm.controls['email'].value,
      this.userForm.controls['password'].value)
      .subscribe(response => {
        if (response) {
          this.router.navigate([''])
        } else {
          this.router.navigate(['/users/sign-up'])
        }
      });
  }
}
