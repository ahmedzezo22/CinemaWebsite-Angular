import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/AdminServices/admin.service';
import { Movie } from 'src/app/models/MovieModel';
import * as $ from 'jquery';
import { subCategory } from 'src/app/models/subCategory';
import { Actor } from 'src/app/models/ActorModel';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css'],
})
export class MovieAddComponent implements OnInit {
  subCategory:subCategory[]
  isEditMode: boolean;
  film:File=null;
  success: string;
  error: string;
  title: string;
  msg: string;
  btn: string;
  movie: Movie[];
  uploadLinks: string[]=[];
  movieModel: Movie;
  id: number;
  movieForm: FormGroup;
  movieName: string;
  img: File;
  linkVal = '(https?|ftp)://(www\d?|[a-zA-Z0-9]+)?\.[a-zA-Z0-9-]+(\:|\.)([a-zA-Z0-9.]+|(\d+)?)([/?].*)?';
  actors:Actor[]
  urlImg: string;
  actorIds:number[]=[]
  exist:string=""
  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.actorIds=[]
    this.actors=[];

    this.subCategory=[];
    this.getAllSubCategories();
    this.getAllActors()
    this.urlImg = 'assets/images-error/movie.jpg';
    this.img = null;
    this.movieModel = {
      id: 0,
      movieName: '',
      moviePost: '',
      movieTrailer: '',
      movieStory: '',
      subCategoryId:0,
      subCategory: {
        id: 0,
        subCategoryName: '',
        categoryId: 0,
        category: {
          categoryName: '',
          id: 0,
        },
      },
    };
    this.title = '';
    this.btn=''
    this.msg = '';
    this.movie = [];
    this.success = '';
    this.error = '';
   this.getAllMovies();
        this.btn = 'اضافه فيلم جديد';
        this.title = 'اضافة فيلم جديد';
    this.movieForm = this.fb.group({
      movieName: ['', [Validators.required, Validators.maxLength(200)]],
      moviePic: [''],
      movieTrailer: ['',[Validators.required]],
      movieStory: ['',[Validators.required]],
      catId:[0,[Validators.required]],
      actorId:[0,Validators.required],
      actorControl:this.fb.array([this.myActorGroup(0,'')]),
      filmVid:[''],
      links:this.fb.array([this.mylinkGroup()])
    });
}

  myActorGroup(id:number,txt:any): FormGroup {
   return this.fb.group({
     actId:id,
     actName:txt
   })
  }
  mylinkGroup(): FormGroup {
    return this.fb.group({
      link:''
    })
  }
  get actorControl(){
    return this.movieForm.get('actorControl') as FormArray
  }
  get links(){
    return this.movieForm.get('links') as FormArray
  }
getAllActors(){
  this.service.GetALlActors().subscribe((data)=>{
    this.actors=data;
  })
}
getAllMovies(){
  this.service.GetAllMovies().subscribe((data)=>{
    this.movie=data
  })
}
onMyClick(frm:number){
  var actor=this.movieForm.get(['actorControl',frm]).value
  var actorId=actor.actId;
  for(let i=0; i<this.actorIds.length;i++){
    const actId=this.actorIds[i];
    if(actId===actorId){
      this.actorIds.splice(i,1)
      break;
    }
  }
}
onActorChange(){
  const id=this.movieForm.value.actorId
  var txt=$('#actorId option:selected').html()
if(id>0 &&txt){
  for(let i=0; i<this.actorIds.length;i++){
    const actId=this.actorIds[i];
    if(actId===id){
      this.exist="تم الاضافه مسبقا"
      return;
    }
  }
  this.actorIds.push(id)
  console.log(this.actorIds);
  (<FormArray>this.movieForm.get('actorControl')).push(this.myActorGroup(id,txt))
}
}
AddLink() {
  (<FormArray>this.movieForm.get('links')).push(this.mylinkGroup());
}
   Addmovie() {
      if (this.movieForm.valid) {
        this.addExtraLinkIfExists();
        this.movieModel.id = 0;
        const fd = new FormData();
        fd.append('moviePost', this.img);
        fd.append('movieName', this.movieForm.value.movieName);
        fd.append('movieTrailer',this.movieForm.value.movieTrailer);
        fd.append('catId',this.movieForm.value.catId);
        fd.append('movieStory',this.movieForm.value.movieStory)
        fd.append('video',this.film)
        for (let i = 0; i < this.actorIds.length; i++) {
          fd.append('actorsId[]', this.actorIds[i].toString());
        }
        for (let i = 0; i < this.uploadLinks.length; i++) {
          fd.append('links[]', this.uploadLinks[i].toString());
        }
        this.service.AddMovie(fd).subscribe(
          () => {
            this.success = 'تم الاضافه بنجاح';
            this.movieForm.reset();
            this.img = null;
          },
          (error) => {
           console.log(error)
          }
        );
      }

  }
  handlPic(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.img = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        $('#img').attr('src', e.target.result);
      };
      reader.readAsDataURL(this.img);
    } else {
      this.img = null;
      $('#img').attr('src', 'assets/images-error/Actor.png');
    }
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
isMovieExist(){
  const mov=this.movieForm.get("movieName").value;
  for(let item of this.movie){
    if(item.movieName===mov){
      this.msg="اسم الفيلم موجود"
      return true;
}
  }
   return false;
}
  goList() {
    sessionStorage.setItem('mov', 'mov');
    this.router.navigate(['controlpanel']);
  }
  getAllSubCategories(){
    this.service.getAllSubCategories().subscribe((list)=>{
      this.subCategory=list
    })
  }
  isLinkValid(link: string) {
    const validLink = new RegExp('(https?|ftp)://(www\d?|[a-zA-Z0-9]+)?\.[a-zA-Z0-9-]+(\:|\.)([a-zA-Z0-9.]+|(\d+)?)([/?].*)?');
    if (!validLink.test(link)) {
      return true;
    }
    return false;
  }
  addExtraLinkIfExists() {
    for (let li of this.links.controls) {
      const val = li.value.link;
      if (val !== null && val !== '') {
        var exist = false;
        for (let i = 0; i < this.uploadLinks.length; i++) {
          if (val === this.uploadLinks[i]) {
            exist = true;
            break;
          }
        }
        if (!exist) {
          this.uploadLinks.push(val);
        }
      }
    }
    return false;
  }

}
