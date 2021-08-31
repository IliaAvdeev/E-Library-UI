import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthorService } from "../services/author.service";

import * as _moment from 'moment';

const moment = _moment;


@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css']
})
export class AuthorFormComponent {
  authorForm = this.fb.group({
    name: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    dateOfDeath: [null],
    countryOfBirth: ['', Validators.required],
    countryOfDeath: [null],
    biography: [null]
  });
  errorMessage = 'Введите корректное значение';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authorService: AuthorService
  ) { }

  onSubmit() {
    this.authorForm.controls['dateOfBirth']
      .setValue(moment(this.authorForm.controls['dateOfBirth'].value).format("YYYY-MM-DD"));
    if (this.authorForm.controls['dateOfDeath'].value != null) {
      this.authorForm.controls['dateOfDeath']
        .setValue(moment(this.authorForm.controls['dateOfDeath'].value).format("YYYY-MM-DD"));
    }
    this.authorService.save({...this.authorForm.value})
      .subscribe(result => this.gotoAuthorList());
  }

  gotoAuthorList() {
    this.router.navigate(['/authors']);
  }
}
