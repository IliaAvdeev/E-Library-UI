import '@angular/localize';
import {Component, Injectable, Output, Input, EventEmitter} from '@angular/core';
import {MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css']
})


@Injectable()
export class CustomPaginatorComponent implements MatPaginatorIntl {
  changes = new Subject<void>();

  @Input() length!: number;
  @Output() pageEvent = new EventEmitter<PageEvent>();
  pageSize = 20;
  pageSizeOptions = [5, 10, 20, 100];


  firstPageLabel = $localize`Первая страница`;
  itemsPerPageLabel = $localize`Объектов на странице:`;
  lastPageLabel = $localize`Последняя страница`;

  nextPageLabel = 'Следующая страница';
  previousPageLabel = 'Предыдущая страница';


  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Страница 1 из 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Страница ${page + 1} из ${amountPages}`;
  }

  page(value?: PageEvent) {
    this.pageEvent.emit(value);
  }
}
