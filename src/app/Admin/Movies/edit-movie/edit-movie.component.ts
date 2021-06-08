import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { AdminService } from 'src/app/AdminServices/admin.service';
import { subCategory } from 'src/app/models/subCategory';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  movieForm: FormGroup;
  subCategories:subCategory[];
  img: File;
  urlImage: string;
  Msg: string;
  id: number;
  linkVal = '(https?|ftp)://(www\d?|[a-zA-Z0-9]+)?\.[a-zA-Z0-9-]+(\:|\.)([a-zA-Z0-9.]+|(\d+)?)([/?].*)?';

  messages = {
    movieName: {
      requierd: 'اسم الفيلم مطلوب',
    },
    story: {
      requierd: 'القصة مطلوبة'
    },
    trailer: {
      requierd: 'اعلان الفيلم مطلوب',
      valid: 'الرابط المدخل غير صحيح'
    },
    catId: {
      requierd: 'التصنيف مطلوب'
    },
    post: {
      requierd: 'ملصق الفيلم مطلوب'
    },
  }

  ngOnInit(): void {
    this.subCategories = [];
    this.img = null;
    this.urlImage = 'assets/images-error/movie.jpg';
    this.Msg = null;
    this.id = 0;

    this.movieForm = this.fb.group({
      movieName: ['', Validators.required],
      story: ['', Validators.required],
      trailer: ['', [Validators.required, Validators.pattern(this.linkVal)]],
      catId: [0, Validators.required],
      post: '',
    })

    this.GetSubCategories();

    this.activateRoute.paramMap.subscribe(param => {
      var id = +param.get('id');
      if (id) {
        this.adminService.getMovie(id).subscribe(movie => {
          this.movieForm.patchValue({
            movieName: movie.movieName,
            story: movie.movieStory,
            trailer: movie.movieTrailer,
            catId: movie.subCategoryId,
          });

          this.id = movie.id;
          this.urlImage = 'assets/moviesPicture/' + movie.moviePost;
          fetch(this.urlImage).then(res => res.blob()).then(blob => {
            var file = new File([blob], movie.moviePost);
            this.img = file;
          })
        }, ex => {
          console.log(ex);
        })
      } else {
        this.backToList();
      }
    })
  }

  backToList() {
    sessionStorage.setItem('mov', 'mov');
    this.router.navigate(['/controlpanel']);
  }

  editMovie() {
    if (this.movieForm.valid && this.img !== null) {
      const fd = new FormData();
      fd.append('moviePost', this.img);
      fd.append('id', this.id.toString());
      fd.append('moviestory', this.movieForm.value.story);
      fd.append('movieName', this.movieForm.value.movieName);
      fd.append('movietrailer', this.movieForm.value.trailer);
      fd.append('subCategoryId', this.movieForm.value.catId);

      this.adminService.editMovie(fd).subscribe(success => {
        this.backToList();
      }, ex => {
        console.log(ex);
        this.Msg = ex.error.title;
        ;
      })
    }
  }

  GetSubCategories() {
    this.adminService.getAllSubCategories().subscribe(subs => {
      this.subCategories = subs;
    }, ex => {
      console.log(ex);
    })
  }

  HandleFiles(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.img = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        $('#image').attr('src', e.target.result);
      }
      reader.readAsDataURL(this.img);
    } else {
      this.img = null;
      $('#image').attr('src', 'assets/images-error/movie.jpg');
    }
  }

}

