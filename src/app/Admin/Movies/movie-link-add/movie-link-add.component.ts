import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/AdminServices/admin.service';
import { Movie } from 'src/app/models/MovieModel';
import { MoviesLink } from 'src/app/models/MoviesLink';
import * as $ from 'jquery'

@Component({
  selector: 'app-movie-link-add',
  templateUrl: './movie-link-add.component.html',
  styleUrls: ['./movie-link-add.component.css']
})
export class MovieLinkAddComponent implements OnInit {
title:string;
btn:string;
film:File=null;
movies:Movie[]=[]
success:string="";
error:string=""
id:number=0;
linkModel:MoviesLink={
  id:0,
  movLink:"",
  movieId:0,
  movie:null,
  quality:"",
  resolution:0
}
linkForm:FormGroup
  constructor(private route:Router,private fb:FormBuilder,private service:AdminService,private ActivateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.linkForm=this.fb.group({
      movieId:[0,Validators.required],
      quality: ["",Validators.required],
      resolution: [0,Validators.required],
      movLink: ["",Validators.required],
      filmVid:null
    })
    this.ActivateRoute.paramMap.subscribe((param)=>{
      const Id=+param.get('id');
      if(Id){
        this.id=Id;
        this.btn="تعديل"
        this.title="تعديل الرابط"
       this.service.getMovieLink(Id).subscribe((link)=>{
          this.linkForm.patchValue({
            movieId:link.movie.id,
            quality: link.quality,
            resolution:link.resolution,
            movLink: link.movLink,
          })
          if(!link.movLink.startsWith("http")){
          const video="assets/videos/"+link.movLink;
          fetch(video).then(res=>res.blob()).then(blob=>{
            var file=new File([blob],link.movLink);
            this.film=file;
            var id=$('#mov');
            id[0].src=URL.createObjectURL(this.film);
            id.parent()[0].load();
          })
          }
       })
      }else{
        this.id=0;
        this.title="اضافة رابط جديد";
        this.btn="اضافة رابط"

      }
    })

    this.getAllMovies();
  }
  goList(){
    sessionStorage.setItem("link","link");
    this.route.navigate(['controlpanel'])
  }
  handlfilms(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.film = event.target.files[0];
      var id=$('#mov');
     id[0].src=URL.createObjectURL(this.film);
     id.parent()[0].load();
    } else {
      this.film = null;
      var id=$('#mov');
      id[0].src='';
      id.parent()[0].load();
    }
  }
  Addmovie(){
    if(this.linkForm.valid){
      if(this.id>0){
        const Model=this.AssignLinkModel();
        this.service.editMovieLink(Model).subscribe(()=>{
          this.success="تم التعديل بنجاح"
           this.goList();
        })
      }else{
     const Model=this.AssignLinkModel();
     this.service.AddLink(Model).subscribe(()=>{
       this.success="تم الاضافة بنجاح"
       this.linkForm.reset();
     },()=>{
       this.error="حدث خطأ اثناء الاضافه"
     })

      }

    }
  }
  AssignLinkModel(){
    this.linkModel.id=this.id;
    this.linkModel.movLink=this.linkForm.value.movLink;
    this.linkModel.movieId=(this.linkForm.value.movieId);
    this.linkModel.quality=this.linkForm.value.quality;
    this.linkModel.resolution=parseInt(this.linkForm.value.resolution);
    return this.linkModel;
  }
  getAllMovies(){
    this.service.GetAllMovies().subscribe((data)=>{
      this.movies=data;
    })
  }
}
