import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { Author } from '../model/author'
import { BookService } from '../services/book.service';
import { AuthorService } from '../services/author.service';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit {

  books!: Book[];
  authors!: Author[];

  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20, 100];
  length!: number;
  pageEvent?: PageEvent;
  pageOfBooks!: Book[];
  currentAuthor?: Author;

  constructor(
    private bookService: BookService,
    private authorService: AuthorService) {
  }

  ngOnInit() {
    this.bookService.findAll().subscribe(data => this.length = data.length);
    this.bookService.findPaginated(this.pageIndex, this.pageSize).subscribe(data => {
      this.pageOfBooks = data;
    });
    this.authorService.findAll().subscribe(data => this.authors = data);
  }

  getAuthor(id: number) {
    if (this.authors) {
      let author = this.authors.find(author => author.id === id);
      if (author != undefined) {
        this.currentAuthor = author;
      }
    }
  }

  public getServerData(event?: PageEvent) {
    this.bookService.findPaginated(event?.pageIndex, event?.pageSize).subscribe(
      response => this.pageOfBooks = response);
    return event;
  }
}
