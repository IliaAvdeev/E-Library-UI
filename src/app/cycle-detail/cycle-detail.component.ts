import { Component, Input, OnInit } from '@angular/core';
import { Cycle } from "../model/cycle";
import { Book } from "../model/book";
import { BookService } from "../services/book.service";

@Component({
  selector: 'app-cycle-detail',
  templateUrl: './cycle-detail.component.html',
  styleUrls: ['./cycle-detail.component.css']
})
export class CycleDetailComponent implements OnInit {
  @Input() cycle?: Cycle;
  books?: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    if (this.cycle) {
      this.bookService.findByCycleId(this.cycle?.id)
        .subscribe(data => this.books = data);
    }
  }

}
