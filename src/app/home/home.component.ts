import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../AdminServices/admin.service';
import { Movie } from '../models/MovieModel';
import { subCategory } from '../models/subCategory';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
subCategory:subCategory[]=[];
formSearch:FormGroup
movie:Movie[]=[]
msg:string;
constructor(private service:HomeService,private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.msg=""
    this.formSearch=this.fb.group({
      search:['',Validators.required]
    })
    this.getAllSubCategories();
    this.getAllMovies();
  }
  getAllSubCategories(){
    this.service.getAllSubCategories().subscribe((data)=>{
      this.subCategory=data;
    })
  }
  getSubCategory(subCat:string){
    this.service.getAllMovies(subCat).subscribe((data)=>{
      this.movie=data;
      this.msg=""
})
  }
  onSearch(){
    this.service.getAllMovies(this.formSearch.value.search).subscribe((data)=>{
      this.movie=data;
      if(this.movie.length==0){this.msg="لا يوجد بيانات بالوقت الحالى"}else{
        this.msg=""
      }
})
  }
  getAllMovies(){
    this.service.getMovies().subscribe((data)=>{
      this.movie=data;
    })
  }
  getMovie(id:number){
    this.router.navigate(['/getmovie',id])
  }
}
