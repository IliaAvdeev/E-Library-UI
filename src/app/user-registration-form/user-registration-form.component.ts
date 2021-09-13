import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Validators} from '@angular/forms';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css']
})
export class UserRegistrationFormComponent {
  userForm = this.fb.group({
    email: ['', Validators.required, Validators.email],
    username: ['', Validators.required],
    password: ['', Validators.required],
    role: [2]
  });
  hidePassword = true;
  errorMessage = "Введите корректное значение";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
  }

  onSubmit() {
    this.userService.register({...this.userForm.value})
      .subscribe(
        response => {
          this.router.navigateByUrl('');
        }, error => {
          window.alert(error.error.message);
        }
      )
  }
}
