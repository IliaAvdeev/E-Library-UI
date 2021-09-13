import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Author} from '../model/author';
import {Book} from "../model/book";
import {AuthorService} from '../services/author.service';
import {BookService} from "../services/book.service";

import * as _moment from 'moment';
import {AuthService} from "../services/auth.service";

const moment = _moment;
moment.locale('ru_RU');

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {
  @Input() author!: Author;
  books!: Book[];

  briefBio!: string;
  fullBioHidden = true;

  editAuthor: Author | undefined;
  errorMessage = 'Введите корректное значение';

  admin: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorService: AuthorService,
    private bookService: BookService,
    private authService: AuthService
  ) {
    this.admin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.authorService.findOne(id)
      .subscribe(data => {
        this.author = data;
        if (data.biography) {
          let endOfFirstParagraph = data.biography.indexOf('\n');
          this.briefBio = data.biography.substring(0, endOfFirstParagraph);
        }
      });
    this.bookService.findByAuthorId(id)
      .subscribe(data => this.books = data);
  }

  formatDate(date: Date): string {
    return moment(date).format('DD MMMM YYYY');
  }

  expandBio() {
    this.fullBioHidden = false;
  }

  collapseBio() {
    this.fullBioHidden = true;
  }

  edit() {
    this.editAuthor = this.author;
  }

  update() {
    if (this.editAuthor) {
      this.authorService
        .update(this.editAuthor, this.author.id)
        .subscribe(result => {
          this.editAuthor = undefined;
          this.router.navigate([`/authors/${this.author.id}`]);
          window.location.reload();
        });
    }
  }

  delete() {
    this.authorService.delete(this.author.id).subscribe(result => this.gotoAuthorList());
  }

  gotoAuthorList() {
    this.router.navigate(['/authors']);
  }
}
