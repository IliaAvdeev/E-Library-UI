import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../model/book';
import {Author} from '../model/author';
import {Genre} from '../model/genre';
import {Cycle} from '../model/cycle';
import {BookService} from '../services/book.service';
import {AuthorService} from '../services/author.service';
import {GenreService} from '../services/genre.service';
import {CycleService} from '../services/cycle.service';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() book!: Book;
  author!: Author;
  genre!: Genre;
  cycle!: Cycle;
  textHidden = true;

  authors!: Author[];
  genres!: Genre[];
  cycles!: Cycle[];
  editBook: Book | undefined;

  admin: boolean;
  loggedIn: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private authorService: AuthorService,
    private genreService: GenreService,
    private cycleService: CycleService,
    private authService: AuthService
  ) {
    this.admin = this.authService.isAdmin();
    this.loggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.findOne(id).subscribe(
      bookData => {
        this.authorService.findOne(bookData.author)
          .subscribe(authorData => this.author = authorData);
        this.genreService.findOne(bookData.genre)
          .subscribe(genreData => this.genre = genreData);
        this.cycleService.findOne(bookData.cycle)
          .subscribe(cycleData => this.cycle = cycleData);
        this.book = bookData;
      }
    )
  }

  expandText() {
    this.textHidden = false;
  }

  collapseText() {
    this.textHidden = true;
  }

  edit() {
    this.authorService.findAll().subscribe(data => {
      this.authors = data;
    });
    this.genreService.findAll().subscribe(data => {
      this.genres = data;
    });
    this.cycleService.findAll().subscribe(data => {
      this.cycles = data;
    });
    this.editBook = this.book;
  }

  getErrorMessage(): string {
    return 'Введите корректное значение';
  }

  update() {
    if (this.editBook) {
      this.bookService
        .update(this.editBook, this.book.id)
        .subscribe(result => {
          this.editBook = undefined;
          this.router.navigate([`/books/${this.book.id}`]);
        });
    }
  }

  delete() {
    this.bookService.delete(this.book.id).subscribe(result => this.gotoBookList());
  }

  gotoBookList() {
    this.router.navigate(['/books']);
  }
}
