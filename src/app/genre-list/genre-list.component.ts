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

