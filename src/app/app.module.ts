import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';
import { AppComponent } from './app.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { AuthorFormComponent } from './author-form/author-form.component';
import { BookFormComponent } from './book-form/book-form.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AuthorService } from './services/author.service';
import { BookService } from './services/book.service';
import { GenreService } from "./services/genre.service";
import { CycleService } from "./services/cycle.service";
import { CustomPaginatorComponent } from './custom-paginator/custom-paginator.component';
import { GenreListComponent } from './genre-list/genre-list.component';
import { GenreFormComponent } from './genre-form/genre-form.component';
import { CycleListComponent } from './cycle-list/cycle-list.component';
import { CycleFormComponent } from './cycle-form/cycle-form.component';
import { CycleDetailComponent } from './cycle-detail/cycle-detail.component';
import { GenreDetailComponent } from './genre-detail/genre-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthorListComponent,
    AuthorFormComponent,
    AuthorDetailComponent,
    BookListComponent,
    BookFormComponent,
    BookDetailComponent,
    CustomPaginatorComponent,
    GenreListComponent,
    GenreFormComponent,
    CycleListComponent,
    CycleFormComponent,
    CycleDetailComponent,
    GenreDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatCheckboxModule
  ],
  providers: [
    AuthorService,
    BookService,
    GenreService,
    CycleService,
    { provide: MAT_DATE_LOCALE, useValue: 'ru_RU' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MatPaginatorIntl, useClass: CustomPaginatorComponent }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
