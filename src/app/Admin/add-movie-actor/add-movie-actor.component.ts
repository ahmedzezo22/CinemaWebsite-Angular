import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/AdminServices/admin.service';
import { Actor } from 'src/app/models/ActorModel';
import { MovieActor } from 'src/app/models/movieActor';
import { Movie } from 'src/app/models/MovieModel';
@Component({
  selector: 'app-add-movie-actor',
  templateUrl: './add-movie-actor.component.html',
  styleUrls: ['./add-movie-actor.component.css'],
})
export class AddMovieActorComponent implements OnInit {
  title: string;
  btn: string;
  success: string = '';
  error: string = '';
  actors: Actor[] = [];
  movies: Movie[] = [];
  movieActorModel: MovieActor;
  movieActor: FormGroup;
  id: number;
  constructor(
    private service: AdminService,
    private router: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.movieActor = this.fb.group({
      movId: [0, Validators.required],
      actorId: [0, Validators.required],
    });
    this.movieActorModel = {
      id: 0,
      movie: null,
      movieActors: null,
      movieActorsId: 0,
      movieId: 0,
    };
    this.getALlActors();
    this.getAllMovies();

    this.router.paramMap.subscribe((param) => {
      const Id = +param.get('id');
      if (!Id) {
        this.title = 'اضافة ممثل';
        this.btn = 'اضافه';
        this.id = 0;
      } else {
        this.id = Id;
        this.btn = 'تعديل ';
        this.title = 'تعديل ممثل';
        this.service.getMovieActorById(Id).subscribe((movActor) => {
          this.movieActor.patchValue({
            movId: movActor.movieId,
            actorId: movActor.movieActorsId,
          });
        });
      }
    });
  }
  goList() {
    sessionStorage.setItem('movActor', 'movActor');
    this.route.navigate(['controlpanel']);
  }
  getALlActors() {
    this.service.GetALlActors().subscribe((data) => {
      this.actors = data;
    });
  }
  getAllMovies() {
    this.service.GetAllMovies().subscribe((data) => {
      this.movies = data;
    });
  }
  AddMovieActor() {
    if (this.movieActor.valid) {

      if (this.id > 0) {
        this.movieActorModel.id=this.id;
        this.movieActorModel.movieActorsId=this.movieActor.value.actorId;
        this.movieActorModel.movieId=this.movieActor.value.movId;
        this.service.editMovieActor(this.movieActorModel).subscribe(()=>{
          this.success="تم التعديل بنجاح"
          this.goList();
        },()=>{this.error="حدث خطأ ما"})
      } else {
        this.movieActorModel.movieId = this.movieActor.value.movId;
        this.movieActorModel.movieActorsId = this.movieActor.value.actorId;
        this.service.AddMovieActor(this.movieActorModel).subscribe(
          () => {
            this.success = 'تم الاضافه بنجاح';
          },
          () => {
            this.error = 'حدث خطأ ما';
          }
        );
      }
    }
  }
}
