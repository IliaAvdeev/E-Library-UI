import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { AuthorService } from '../services/author.service';
import { GenreService } from '../services/genre.service';
import { CycleService } from '../services/cycle.service';
import { Book } from '../model/book';
import { Author } from '../model/author';
import { Genre } from '../model/genre';
import { Cycle } from '../model/cycle';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {
  bookForm = this.fb.group({
    title: ['', Validators.required],
    author: [null, Validators.required],
    genre: [null, Validators.required],
    text: ['', Validators.required],
    cycle: [null],
    description: ['']
  });
  errorMessage = 'Введите корректное значение';

  book!: Book;
  authors!: Author[];
  genres!: Genre[];
  cycles!: Cycle[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private genreService: GenreService,
    private cycleService: CycleService
  ) {
    this.authorService.findAll().subscribe(data => {
                      this.authors = data;
                    });
    this.genreService.findAll().subscribe(data => {
                      this.genres = data;
                    });
    this.cycleService.findAll().subscribe(data => {
                      this.cycles = data;
                    });
  }

  onSubmit() {
    this.bookService.save({...this.bookForm.value}).subscribe(result => this.gotoBookList());
  }

  gotoBookList() {
    this.router.navigate(['/books']);
  }
}
