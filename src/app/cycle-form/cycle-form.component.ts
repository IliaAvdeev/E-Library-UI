import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Cycle } from "../model/cycle";

@Component({
  selector: 'app-cycle-form',
  templateUrl: './cycle-form.component.html',
  styleUrls: ['./cycle-form.component.css']
})
export class CycleFormComponent {
  cycleForm = this.fb.group({
    name: ['', Validators.required]
  });
  errorMessage = 'Введите значение';
  @Output() formSubmitted = new EventEmitter<Cycle>();

  constructor(
    private fb: FormBuilder
  ) { }

  onSubmit() {
    this.formSubmitted.emit({...this.cycleForm.value});
  }

}

