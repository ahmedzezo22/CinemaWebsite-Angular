import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ForgetPasswordComponent } from './Account/forget-password/forget-password.component';
import { LoginComponent } from './Account/login/login.component';
import { PasswordconfirmComponent } from './Account/passwordconfirm/passwordconfirm.component';
import { RegisterConfirmComponent } from './Account/register-confirm/register-confirm.component';
import { RegisterComponent } from './Account/register/register.component';
import { ActorAddComponent } from './Admin/Actors/actor-add/actor-add.component';
import { AddMovieActorComponent } from './Admin/add-movie-actor/add-movie-actor.component';
import { AddUserComponent } from './Admin/add-user/add-user.component';
import { AddCategoryComponent } from './Admin/Categories/add-category/add-category.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { EditRoleComponent } from './Admin/edit-role/edit-role.component';
import { EditActorsComponent } from './Admin/Movies/edit-actors/edit-actors.component';
import { EditLinksComponent } from './Admin/Movies/edit-links/edit-links.component';
import { EditMovieComponent } from './Admin/Movies/edit-movie/edit-movie.component';
import { MovieAddComponent } from './Admin/Movies/movie-add/movie-add.component';
import { MovieLinkAddComponent } from './Admin/Movies/movie-link-add/movie-link-add.component';
import { AddSubCategoryComponent } from './Admin/sub-category/add-sub-category/add-sub-category.component';
import { GetMovieComponent } from './get-movie/get-movie.component';
import { DashboardGuardGuard } from './guards/dashboard-guard.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path:"",component:HomeComponent,pathMatch:'full'},
  {path:"home/:id",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"registerConfirm",component:RegisterConfirmComponent},
  {path:"forgetpassword",component:ForgetPasswordComponent},
  {path:"passwordconfirm",component:PasswordconfirmComponent},
  {path:"controlpanel",component:DashboardComponent,canActivate:[DashboardGuardGuard]},
  {path:"edituser/:id",component:AddUserComponent},
  {path:"edit-role/:userId/:roleId",component:EditRoleComponent},
  {path:"access-denied",component:AccessDeniedComponent},
  {path:"not-found",component:NotFoundComponent},
  {path:"addcategory",component:AddCategoryComponent},
  {path:"editcategory/:id/:name",component:AddCategoryComponent},
  {path:"addsubcategory",component:AddSubCategoryComponent},
  {path:"editsubcategory/:id/:id1/:id2",component:AddSubCategoryComponent},
  {path:"addactor",component:ActorAddComponent},
  {path:"editactor/:id/:name",component:ActorAddComponent},
  {path:"addmovie",component:MovieAddComponent},
  {path:"editmovie/:id",component:EditMovieComponent},
  {path:"editlink/:id",component:EditLinksComponent},
  {path:"addlink",component:MovieLinkAddComponent},
  {path:"editmovielink/:id",component:MovieLinkAddComponent},
  {path:"editmovieactor/:id",component:AddMovieActorComponent},
  {path:"addmovieactor",component:AddMovieActorComponent},
  {path:"getmovie/:id",component:GetMovieComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
