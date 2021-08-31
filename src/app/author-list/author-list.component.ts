import { Component, OnInit } from '@angular/core';
import { Author } from '../model/author';
import { AuthorService } from '../services/author.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20, 100];
  length!: number;
  pageEvent?: PageEvent;
  pageOfAuthors!: Author[];

  constructor(private authorService: AuthorService) {
  }

  ngOnInit() {
    this.authorService.findAll().subscribe(data => this.length = data.length);
    this.authorService.findPaginated(this.pageIndex, this.pageSize).subscribe(data => {
      this.pageOfAuthors = data;
    });
  }

  public getServerData(event?: PageEvent) {
    this.authorService.findPaginated(event?.pageIndex, event?.pageSize).subscribe(
      response => this.pageOfAuthors = response);
    return event;
  }
}
