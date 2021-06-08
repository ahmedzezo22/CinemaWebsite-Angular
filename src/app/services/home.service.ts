import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovModel } from '../models/GetMovieModel';
import { Movie } from '../models/MovieModel';
import { subCategory } from '../models/subCategory';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
baseUrl="http://localhost:5000/Home/"
header={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}
  constructor(private http:HttpClient) { }
  // searchMovie(input: any): Observable<Movie[]> {
  //   return this.http
  //     .get<Movie[]>(`${this.baseUrl}SearchMovie/${input}`, this.header)
  //     .pipe();
  // }
  getAllSubCategories(): Observable<subCategory[]> {
    return this.http
      .get<subCategory[]>(`${this.baseUrl}GetAllSubCategories`, this.header)
      .pipe();
  }
  getAllMovies(name?:string): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(`${this.baseUrl}GetAllMovies/${name}`, this.header)
      .pipe();
  }
  getMovies():Observable<Movie[]> {
    return this.http
      .get<Movie[]>(`${this.baseUrl}GetAllMovies`, this.header)
      .pipe();
    }
    getMovieById(id:number):Observable<MovModel>{
      return this.http.get<MovModel>(`${this.baseUrl}GetMovieById/${id}`).pipe()    }

}

