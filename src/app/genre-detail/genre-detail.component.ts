import {Component, OnInit, Input} from '@angular/core';
import {Genre} from "../model/genre";
import {Book} from "../model/book";
import {BookService} from "../services/book.service";


@Component({
  selector: 'app-genre-detail',
  templateUrl: './genre-detail.component.html',
  styleUrls: ['./genre-detail.component.css']
})
export class GenreDetailComponent implements OnInit {
  @Input() genre?: Genre;
  books?: Book[];

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    if (this.genre) {
      this.bookService.findByGenreId(this.genre?.id)
        .subscribe(data => this.books = data);
    }
  }
}
