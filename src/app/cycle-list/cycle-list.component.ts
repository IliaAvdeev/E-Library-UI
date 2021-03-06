import {Component, OnInit, Input} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Cycle} from "../model/cycle";
import {CycleService} from "../services/cycle.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-cycle-list',
  templateUrl: './cycle-list.component.html',
  styleUrls: ['./cycle-list.component.css']
})
export class CycleListComponent implements OnInit {

  length!: number;
  @Input() pageEvent?: PageEvent;
  pageOfCycles!: Cycle[];

  formHidden = true;
  @Input() formSubmission?: Cycle;

  checkboxesHidden = true;
  cyclesForDeletion: number[] = [];

  admin: boolean;

  constructor(
    private cycleService: CycleService,
    private authService: AuthService
  ) {
    this.admin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.cycleService.findAll().subscribe(data => this.length = data.length);
    this.cycleService.findPaginated(0, 20).subscribe(data => {
      this.pageOfCycles = data;
    });
  }

  public getServerData(event?: PageEvent) {
    this.cycleService.findPaginated(event?.pageIndex, event?.pageSize).subscribe(
      response => this.pageOfCycles = response);
    return event;
  }

  submitCycle(formSubmission?: Cycle) {
    if (formSubmission) {
      this.cycleService.save(formSubmission)
        .subscribe(response => window.location.reload())
    }
  }

  selectCycle(id: number) {
    if (!this.cyclesForDeletion.includes(id)) {
      this.cyclesForDeletion.push(id);
    } else {
      let index = this.cyclesForDeletion.indexOf(id);
      this.cyclesForDeletion.splice(index, 1);
    }
  }

  deleteCycles() {
    if (this.checkboxesHidden) {
      this.checkboxesHidden = false;
    } else {
      this.checkboxesHidden = true;
      this.cycleService.deleteAll(this.cyclesForDeletion).subscribe(
        response => window.location.reload()
      )
    }
  }
}


