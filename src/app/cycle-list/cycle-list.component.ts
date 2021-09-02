import { Component, OnInit, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Cycle } from "../model/cycle";
import { Book } from "../model/book";
import { CycleService } from "../services/cycle.service";
import { BookService } from "../services/book.service";

@Component({
  selector: 'app-cycle-list',
  templateUrl: './cycle-list.component.html',
  styleUrls: ['./cycle-list.component.css']
})
export class CycleListComponent implements OnInit {

  length!: number;
  @Input() pageEvent?: PageEvent;
  cycles!: Cycle[];
  pageOfCycles!: Cycle[];
  cyclesBooks = new Map<number, Book[]>();
  formHidden = true;
  @Input() formSubmission?: Cycle;

  constructor(
    private cycleService: CycleService,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.cycleService.findAll().subscribe(data => {
      this.length = data.length;
      this.cycles = data;
      data.forEach((cycle) => {
        this.bookService.findByCycleId(cycle.id)
          .subscribe(data => this.cyclesBooks.set(cycle.id, data));
      })
    });
    this.cycleService.findPaginated(0, 20).subscribe(data => {
      this.pageOfCycles = data;
    });
  }

  public getServerData(event?: PageEvent) {
    this.cycleService.findPaginated(event?.pageIndex, event?.pageSize).subscribe(
      response => this.pageOfCycles = response);
    return event;
  }

  getBooks(id: number): Book[] {
    let books = this.cyclesBooks.get(id);
    if (books) {
      return books;
    }
    return [];
  }

  displayForm() {
    this.formHidden = false;
  }

  submitCycle(formSubmission?: Cycle) {
    if (formSubmission) {
      this.cycleService.save(formSubmission)
        .subscribe(response => window.location.reload())
    }
  }

}


