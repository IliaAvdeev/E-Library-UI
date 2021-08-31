import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';
import { BookListComponent } from './book-list/book-list.component'
import { AuthorFormComponent } from './author-form/author-form.component';
import { BookFormComponent } from './book-form/book-form.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

const routes: Routes = [
  { path: 'authors', component: AuthorListComponent },
  { path: 'books', component: BookListComponent },
  { path: 'authors/new', component: AuthorFormComponent },
  { path: 'books/new', component: BookFormComponent },
  { path: 'authors/:id', component: AuthorDetailComponent },
  { path: 'books/:id', component: BookDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }