import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor } from '../models/ActorModel';
import { Caregory } from '../models/categoryModel';
import { editUserModel } from '../models/editUserModel';
import { editUserRoleModel } from '../models/editUserRoleModel';
import { MovieActor } from '../models/movieActor';
import { Movie } from '../models/MovieModel';
import { MoviesLink } from '../models/MoviesLink';
import { RegisterModel } from '../models/register-model';
import { roleModel } from '../models/roleModel';
import { subCategory } from '../models/subCategory';
import { UserModel } from '../models/UserModel';
import { userRoleModel } from '../models/userRoleModel';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = 'http://localhost:5000/Admin/';
  header = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/json',
    }),
    withCredentials: true,
  };
  constructor(private http: HttpClient) {}
  GetAllUsers(): Observable<Users[]> {
    return this.http
      .get<Users[]>(`${this.baseUrl}GetAllUsers`, this.header)
      .pipe();
  }
  addUser(model: UserModel) {
    return this.http.post(`${this.baseUrl}AddUser`, model, this.header).pipe();
  }
  Getuser(id: string): Observable<Users> {
    return this.http
      .get<Users>(`${this.baseUrl}GetUser/${id}`, this.header)
      .pipe();
  }
  editUser(model: editUserModel): Observable<Users> {
    return this.http.put<Users>(`${this.baseUrl}EditUser`, model, this.header);
  }
  deleteAll(ids: string[]): Observable<Users> {
    return this.http
      .post<Users>(`${this.baseUrl}DeleteUsers`, ids, this.header)
      .pipe();
  }
  getUserRoles(): Observable<userRoleModel[]> {
    return this.http
      .get<userRoleModel[]>(`${this.baseUrl}GetUsersRoles`, this.header)
      .pipe();
  }
  getAllRoles(): Observable<roleModel[]> {
    return this.http
      .get<roleModel[]>(`${this.baseUrl}GetAllRoles`, this.header)
      .pipe();
  }
  editUserRole(userRole: editUserRoleModel) {
    return this.http
      .put(`${this.baseUrl}editUserRole`, userRole, this.header)
      .pipe();
  }

  //categorie Managements
  getAllCategories(): Observable<Caregory[]> {
    return this.http
      .get<Caregory[]>(`${this.baseUrl}GetAllCategories`, this.header)
      .pipe();
  }
  AddCategory(cat: Caregory): Observable<Caregory> {
    return this.http
      .post<Caregory>(`${this.baseUrl}AddCategory`, cat, this.header)
      .pipe();
  }
  editCategory(cat: Caregory): Observable<Caregory> {
    return this.http
      .put<Caregory>(`${this.baseUrl}EditCategory`, cat, this.header)
      .pipe();
  }
  deleteAllCategory(ids: any[]): Observable<Caregory> {
    return this.http
      .post<Caregory>(`${this.baseUrl}DeleteCategory`, ids, this.header)
      .pipe();
  }
  getAllSubCategories(): Observable<subCategory[]> {
    return this.http
      .get<subCategory[]>(`${this.baseUrl}GetAllSubCategories`, this.header)
      .pipe();
  }

  AddSubCategory(cat: subCategory): Observable<subCategory> {
    return this.http
      .post<subCategory>(`${this.baseUrl}AddSubCategory`, cat, this.header)
      .pipe();
  }
  editSubCategory(cat: subCategory): Observable<subCategory> {
    return this.http
      .put<subCategory>(`${this.baseUrl}EditSubCategory`, cat, this.header)
      .pipe();
  }
  deleteAllSubCategory(ids: any[]): Observable<subCategory> {
    return this.http
      .post<subCategory>(`${this.baseUrl}DeleteSubCategory`, ids, this.header)
      .pipe();
  }
  AddActor(fb: FormData) {
    return this.http
      .post(`${this.baseUrl}AddActor`, fb, { withCredentials: true })
      .pipe();
  }
  GetALlActors(): Observable<Actor[]> {
    return this.http
      .get<Actor[]>(`${this.baseUrl}GetAllActors`, this.header)
      .pipe();
  }
  editActor(fb: FormData): Observable<Actor> {
    return this.http
      .put<Actor>(`${this.baseUrl}EditActor`, fb, { withCredentials: true })
      .pipe();
  }
  getActor(id: number): Observable<Actor> {
    return this.http
      .get<Actor>(`${this.baseUrl}GetActor/${id}`, this.header)
      .pipe();
  }
  deleteAllActors(ids: any[]): Observable<Actor> {
    return this.http
      .post<Actor>(`${this.baseUrl}DeleteAllActors`, ids, this.header)
      .pipe();
  }
  GetAllMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(`${this.baseUrl}GetALlMovies`, this.header)
      .pipe();
  }
  AddMovie(fd: FormData): Observable<Movie> {
    return this.http
      .post<Movie>(`${this.baseUrl}AddMovie`, fd, { withCredentials: true })
      .pipe();
  }
  getMovie(id: number): Observable<Movie> {
    return this.http
      .get<Movie>(`${this.baseUrl}GetMovie/${id}`, { withCredentials: true })
      .pipe();
  }
  deleteMovie(ids: any[]) {
    return this.http
      .post(`${this.baseUrl}DeleteMovie`, ids, this.header)
      .pipe();
  }
  editMovie(fd: FormData): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}EditMovie`, fd, {
      withCredentials: true,
    });
  }
  searchMovie(input: any): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(`${this.baseUrl}SearchMovie/${input}`, this.header)
      .pipe();
  }
  getAllLinks(): Observable<MoviesLink[]> {
    return this.http
      .get<MoviesLink[]>(`${this.baseUrl}GetAllMovieLinks`, this.header)
      .pipe();
  }
  searchLinks(link: string): Observable<MoviesLink[]> {
    return this.http
      .get<MoviesLink[]>(`${this.baseUrl}SearchLinks/${link}`, this.header)
      .pipe();
  }
  deletelinks(ids: any[]) {
    return this.http
      .post(`${this.baseUrl}DeleteLinks`, ids, this.header)
      .pipe();
  }
  AddLink(LinkProp: MoviesLink): Observable<MoviesLink> {
    return this.http
      .post<MoviesLink>(`${this.baseUrl}AddMovieLinks`, LinkProp, this.header)
      .pipe();
  }
  getMovieLink(id: number): Observable<MoviesLink> {
    return this.http.get<MoviesLink>(
      `${this.baseUrl}GetMovieLink/${id}`,
      this.header
    );
  }
  editMovieLink(model: MoviesLink) {
    return this.http
      .put(`${this.baseUrl}EditMovieLink`, model, this.header)
      .pipe();
  }
  getAllMovieActors(): Observable<MovieActor[]> {
    return this.http
      .get<MovieActor[]>(`${this.baseUrl}getAllMovieActors`, this.header)
      .pipe();
  }
  searchMovieActors(search: string): Observable<MovieActor[]> {
    return this.http
      .get<MovieActor[]>(
        `${this.baseUrl}SearchMovieActors/${search}`,
        this.header
      )
      .pipe();
  }
  deleteMovieActors(ids: any[]) {
    return this.http
      .post(`${this.baseUrl}DeleteMovieActors`, ids, this.header)
      .pipe();
  }
  AddMovieActor(movieActor: MovieActor): Observable<MovieActor> {
    return this.http
      .post<MovieActor>(`${this.baseUrl}AddMovieActor`, movieActor, this.header)
      .pipe();
  }
  getMovieActorById(id: number): Observable<MovieActor> {
    return this.http
      .get<MovieActor>(`${this.baseUrl}getMovieActorById/${id}`, this.header)
      .pipe();
  }
  editMovieActor(model: MovieActor): Observable<MovieActor> {
    return this.http
      .put<MovieActor>(`${this.baseUrl}EditMovieActor`, model, this.header)
      .pipe();
  }
  CountCategories():Observable<number>{
    return this.http.get<number>(`${this.baseUrl}CountCategories`,this.header).pipe();
  }
  CountMovies():Observable<number>{
    return this.http.get<number>(`${this.baseUrl}CountMovies`,this.header).pipe();
  }
  CountActors():Observable<number>{
    return this.http.get<number>(`${this.baseUrl}CountActors`,this.header).pipe();
  }
  CountSubCategories():Observable<number>{
    return this.http.get<number>(`${this.baseUrl}CountSubCategories`,this.header).pipe();
  }
  CountUsers():Observable<number>{
    return this.http.get<number>(`${this.baseUrl}CountUsers`,this.header).pipe();
  }
  CountLinks():Observable<number>{
    return this.http.get<number>(`${this.baseUrl}CountLinks`,this.header).pipe();
  }
}
