import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthorListComponent} from './author-list/author-list.component';
import {BookListComponent} from './book-list/book-list.component';
import {GenreListComponent} from "./genre-list/genre-list.component";
import {CycleListComponent} from "./cycle-list/cycle-list.component";
import {AuthorFormComponent} from './author-form/author-form.component';
import {BookFormComponent} from './book-form/book-form.component';
import {UserRegistrationFormComponent} from "./user-registration-form/user-registration-form.component";
import {UserLoginFormComponent} from "./user-login-form/user-login-form.component";
import {AuthorDetailComponent} from './author-detail/author-detail.component';
import {BookDetailComponent} from './book-detail/book-detail.component';

const routes: Routes = [
  {path: 'authors', component: AuthorListComponent},
  {path: 'books', component: BookListComponent},
  {path: 'genres', component: GenreListComponent},
  {path: 'cycles', component: CycleListComponent},
  {path: 'authors/create', component: AuthorFormComponent},
  {path: 'books/create', component: BookFormComponent},
  {path: 'users/register', component: UserRegistrationFormComponent},
  {path: 'users/login', component: UserLoginFormComponent},
  {path: 'authors/:id', component: AuthorDetailComponent},
  {path: 'books/:id', component: BookDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
