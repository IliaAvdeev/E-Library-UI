import { Component, OnInit, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Genre } from '../model/genre';
import { Book } from "../model/book";
import { GenreService } from '../services/genre.service';
import { BookService } from "../services/book.service";

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {

  length!: number;
  @Input() pageEvent?: PageEvent;
  genres!: Genre[];
  pageOfGenres!: Genre[];
  genresBooks = new Map<number, Book[]>();
  formHidden = true;
  @Input() formSubmission?: Genre;

  constructor(private genreService: GenreService,
              private bookService: BookService) { }

  ngOnInit(): void {
    this.genreService.findAll().subscribe(data => {
      this.length = data.length;
      this.genres = data;
      data.forEach((genre) => {
        this.bookService.findByGenreId(genre.id)
          .subscribe(data => this.genresBooks.set(genre.id, data));
      })
    });
    this.genreService.findPaginated(0, 20).subscribe(data => {
      this.pageOfGenres = data;
    });
  }

  public getServerData(event?: PageEvent) {
    this.genreService.findPaginated(event?.pageIndex, event?.pageSize).subscribe(
      response => this.pageOfGenres = response);
    return event;
  }

  getBooks(id: number): Book[] {
    let books = this.genresBooks.get(id);
    if (books) {
      return books;
    }
    return [];
  }

  displayForm() {
    this.formHidden = false;
  }

  submitGenre(formSubmission?: Genre) {
    if (formSubmission) {
      this.genreService.save(formSubmission)
        .subscribe(response => window.location.reload())
    }
  }
}

