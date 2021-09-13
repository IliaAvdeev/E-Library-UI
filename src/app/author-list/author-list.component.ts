import {Component, OnInit, Input} from '@angular/core';
import {Author} from '../model/author';
import {AuthorService} from '../services/author.service';
import {PageEvent} from '@angular/material/paginator';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  length!: number;
  @Input() pageEvent?: PageEvent;
  pageOfAuthors!: Author[];
  checkboxesHidden = true;
  authorsForDeletion: number[] = [];

  admin: boolean;

  constructor(
    private authorService: AuthorService,
    private authService: AuthService
  ) {
    this.admin = this.authService.isAdmin();
  }

  ngOnInit() {
    this.authorService.findAll().subscribe(data => this.length = data.length);
    this.authorService.findPaginated(0, 20).subscribe(data => {
      this.pageOfAuthors = data;
    });
  }

  public getServerData(event?: PageEvent) {
    this.authorService.findPaginated(event?.pageIndex, event?.pageSize).subscribe(
      response => this.pageOfAuthors = response);
    return event;
  }

  deleteAuthors() {
    if (this.checkboxesHidden) {
      this.checkboxesHidden = false;
    } else {
      this.checkboxesHidden = true;
      this.authorService.deleteAll(this.authorsForDeletion).subscribe(
        response => {
          this.authorsForDeletion = [];
          window.location.reload()
        }
      )
    }
  }

  selectAuthor(id: number) {
    if (!this.authorsForDeletion.includes(id)) {
      this.authorsForDeletion.push(id);
    } else {
      let index = this.authorsForDeletion.indexOf(id);
      this.authorsForDeletion.splice(index, 1);
    }
  }
}
