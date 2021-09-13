import {Component, Output, EventEmitter} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Validators} from '@angular/forms';
import {Genre} from "../model/genre";

@Component({
  selector: 'app-genre-form',
  templateUrl: './genre-form.component.html',
  styleUrls: ['./genre-form.component.css']
})
export class GenreFormComponent {
  genreForm = this.fb.group({
      name: ['', Validators.required]
    }
  );
  errorMessage = 'Введите значение';
  @Output() formSubmitted = new EventEmitter<Genre>();

  constructor(
    private fb: FormBuilder
  ) {
  }

  onSubmit() {
    this.formSubmitted.emit({...this.genreForm.value});
  }
}

