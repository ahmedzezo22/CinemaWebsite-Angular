import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { RegisterConfirmComponent } from './Account/register-confirm/register-confirm.component';
import { ForgetPasswordComponent } from './Account/forget-password/forget-password.component';
import { PasswordconfirmComponent } from './Account/passwordconfirm/passwordconfirm.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { UsersComponent } from './Admin/users/users.component';
import { AddUserComponent } from './Admin/add-user/add-user.component';
import { UserRolesComponent } from './Admin/user-roles/user-roles.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { DashboardGuardGuard } from './guards/dashboard-guard.guard';
import { EditRoleComponent } from './Admin/edit-role/edit-role.component';
import { CategoryListComponent } from './Admin/Categories/category-list/category-list.component';
import { AddCategoryComponent } from './Admin/Categories/add-category/add-category.component';
import { SubCategoryComponent } from './Admin/subcategories/sub-category/sub-category.component';
import { AddSubCategoryComponent } from './Admin/sub-category/add-sub-category/add-sub-category.component';
import { ActorListComponent } from './Admin/Actors/actor-list/actor-list.component';
import { ActorAddComponent } from './Admin/Actors/actor-add/actor-add.component';
import { MovieListComponent } from './Admin/Movies/movie-list/movie-list.component';
import { MovieAddComponent } from './Admin/Movies/movie-add/movie-add.component';
import { EditMovieComponent } from './Admin/Movies/edit-movie/edit-movie.component';
import { EditLinksComponent } from './Admin/Movies/edit-links/edit-links.component';
import { EditActorsComponent } from './Admin/Movies/edit-actors/edit-actors.component';
import { MovieLinkListComponent } from './Admin/movie-link-list/movie-link-list.component';
import { MovieActorListComponent } from './Admin/movie-actor-list/movie-actor-list.component';
import { MovieLinkAddComponent } from './Admin/Movies/movie-link-add/movie-link-add.component';
import { AddMovieActorComponent } from './Admin/add-movie-actor/add-movie-actor.component';
import { GetMovieComponent } from './get-movie/get-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
    RegisterConfirmComponent,
    ForgetPasswordComponent,
    PasswordconfirmComponent,
    DashboardComponent,
    UsersComponent,
    AddUserComponent,
    UserRolesComponent,
    NotFoundComponent,
    AccessDeniedComponent,
    EditRoleComponent,
    CategoryListComponent,
    AddCategoryComponent,
    SubCategoryComponent,
    AddSubCategoryComponent,
    ActorListComponent,
    ActorAddComponent,
    MovieListComponent,
    MovieAddComponent,
    EditMovieComponent,
    EditLinksComponent,
    EditActorsComponent,
    MovieLinkListComponent,
    MovieActorListComponent,
    MovieLinkAddComponent,
    AddMovieActorComponent,
    GetMovieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DashboardGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
