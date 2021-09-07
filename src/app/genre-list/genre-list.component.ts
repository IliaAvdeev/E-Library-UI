import { Component, OnInit, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Genre } from '../model/genre';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {

  length!: number;
  @Input() pageEvent?: PageEvent;
  pageOfGenres!: Genre[];

  formHidden = true;
  @Input() formSubmission?: Genre;

  checkboxesHidden = true;
  genresForDeletion: number[] = [];

  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.genreService.findAll().subscribe(data => this.length = data.length);
    this.genreService.findPaginated(0, 20).subscribe(data => {
      this.pageOfGenres = data;
    });
  }

  public getServerData(event?: PageEvent) {
    this.genreService.findPaginated(event?.pageIndex, event?.pageSize).subscribe(
      response => this.pageOfGenres = response);
    return event;
  }

  submitGenre(formSubmission?: Genre) {
    if (formSubmission) {
      this.genreService.save(formSubmission)
        .subscribe(response => window.location.reload())
    }
  }

  selectGenre(id: number) {
    if (!this.genresForDeletion.includes(id)) {
      this.genresForDeletion.push(id);
    } else {
      let index = this.genresForDeletion.indexOf(id);
      this.genresForDeletion.splice(index, 1);
    }
  }

  deleteGenres() {
    if (this.checkboxesHidden) {
      this.checkboxesHidden = false;
    } else {
      this.checkboxesHidden = true;
      this.genreService.deleteAll(this.genresForDeletion).subscribe(
        response => window.location.reload()
      )
    }
  }
}

