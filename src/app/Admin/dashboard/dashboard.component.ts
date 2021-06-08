import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AdminService } from 'src/app/AdminServices/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
isUserList:boolean
isAddUser:boolean
isUserRole:boolean
isCategoryList:boolean;
 isSubCategoryList: boolean;
 isActorList:boolean;
 isMovieList:boolean;
 isLinksList:boolean;
 isMoviesActorList:boolean;
 name:string=""
 mainPanel:boolean
 categoryCount:number=-1;
 subCategoryCount:number=-1;
 movieCount:number=-1;
 actorCount:number=-1;
 linksCount:number=-1;
 usersCount:number=-1;
 
  constructor(private router:Router,private service:AdminService) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   document.getElementsByClassName("spinner")
    //   this.spinner=true;
    // }, 10000);
   this.isLinksList=false;
    this.isUserList=false;
    this.isActorList=false;
    this.isAddUser=false;
    this.isUserRole=false;
    this.isCategoryList=false;
    this.isSubCategoryList=false;
    this.isMovieList=false;
    this.isMoviesActorList=false;
    this.mainPanel=true;
    this.getCategoryCount();
    this.getUserCount();
    this.getLinksCount();
    this.getMovieCount();
    this.getSubCategoryCount();
    this.getActorCount();
    if(localStorage.getItem("name")){
      this.name=localStorage.getItem("name");
    }
    if(sessionStorage.getItem("editUserRole")){
      this.checkUserRole();
      sessionStorage.removeItem("editUserRole")
     }

     if(sessionStorage.getItem("mov")){
      this.checkMovie();
      sessionStorage.removeItem("mov")
     }else
     if(sessionStorage.getItem("cat")){
      this.checkCategory();
      sessionStorage.removeItem("cat")
     }
     if(sessionStorage.getItem("cat1")){
      this.checkSubCategory();
      sessionStorage.removeItem("cat1")
     }else
     if(sessionStorage.getItem("act")){
      this.checkActor();
      sessionStorage.removeItem("act")
     }else
     if(sessionStorage.getItem("link")){
       this.checkLinks();
       sessionStorage.removeItem("link");
     }else if(sessionStorage.getItem("movActor")){
         this.checkMovieActors();
         sessionStorage.removeItem("movActor")
     }

   $(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });
        });
  }
  checkUser(){
    this.isAddUser=false;
    this.isUserRole=false;
    this.isCategoryList=false;
    this.isSubCategoryList=false
    this.isActorList=false;
    this.isMovieList=false;
    this.isLinksList=false;
    this.mainPanel=false;
    return this.isUserList=true;

  }
  AddUser(){
    this.isUserList=false;
    this.isSubCategoryList=false
    this.isUserRole=false;
    this.isCategoryList=false;
    this.isActorList=false;
    this.isMovieList=false;
    this.isLinksList=false;
    this.isMoviesActorList=false;
    this.mainPanel=false;
    return this.isAddUser=true;
  }
  checkUserRole(){
    this.isAddUser=false;
    this.isUserList=false;
    this.isCategoryList=false;
    this.isSubCategoryList=false
    this.isActorList=false;
    this.isMovieList=false;
    this.isLinksList=false;
    this.isMoviesActorList=false;
    return this.isUserRole=true;
  }
  checkCategory(){
    this.isAddUser=false;
    this.isUserList=false;
    this.isUserRole=false;
    this.isSubCategoryList=false
    this.isActorList=false;
    this.isMovieList=false;
    this.isLinksList=false;
    this.isMoviesActorList=false;
    this.mainPanel=false;
    return this.isCategoryList=true;
  }
  AddCategory(){
    this.router.navigate(['addcategory'])
  }
  AddSubCategory(){
    this.router.navigate(['addsubcategory'])
  }
  AddActor(){
    this.router.navigate(['addactor']);
  }
  addMovie(){
    this.router.navigate(['addmovie']);
  }
  addNewLink(){
    this.router.navigate(['addlink'])
  }
  addNewMovieActors(){
    this.router.navigate(['addmovieactor'])
  }
  checkSubCategory(){
    this.isAddUser=false;
    this.isUserList=false;
    this.isUserRole=false;
    this.isCategoryList=false;
    this.isActorList=false;
    this.isMovieList=false;
    this.isLinksList=false;
    this.isMoviesActorList=false;
    this.mainPanel=false;
    return this.isSubCategoryList=true
  }
  checkActor(){
    this.isAddUser=false;
    this.isUserList=false;
    this.isUserRole=false;
    this.isCategoryList=false;
    this.isSubCategoryList=false;
    this.isMovieList=false;
    this.isLinksList=false;
    this.isMoviesActorList=false;
    this.mainPanel=false;
    return this.isActorList=true;
  }
  checkMovie(){
    this.isAddUser=false;
    this.isUserList=false;
    this.isUserRole=false;
    this.isCategoryList=false;
    this.isSubCategoryList=false;
    this.isActorList=false;
    this.isLinksList=false;
    this.isMoviesActorList=false;
    this.mainPanel=false;
    return this.isMovieList=true;
  }
  checkLinks(){
    this.isAddUser=false;
    this.isUserList=false;
    this.isUserRole=false;
    this.isCategoryList=false;
    this.isSubCategoryList=false;
    this.isActorList=false;
    this.isMovieList=false;
    this.isMoviesActorList=false;
    this.mainPanel=false;
    return this.isLinksList=true;
  }
  checkMovieActors(){
    this.isAddUser=false;
    this.isUserList=false;
    this.isUserRole=false;
    this.isCategoryList=false;
    this.isSubCategoryList=false;
    this.isActorList=false;
    this.isMovieList=false;
    this.isLinksList=false;
    this.mainPanel=false;
    return this.isMoviesActorList=true;
  }
  mainControlPanel(){
    this.isAddUser=false;
    this.isUserList=false;
    this.isUserRole=false;
    this.isCategoryList=false;
    this.isSubCategoryList=false;
    this.isActorList=false;
    this.isMovieList=false;
    this.isLinksList=false;
    this.isMoviesActorList=false;
    this.getCategoryCount();
    this.getUserCount();
    this.getLinksCount();
    this.getMovieCount();
    this.getSubCategoryCount();
    this.getActorCount();
    return this.mainPanel=true;
  }
  getCategoryCount(){
    this.service.CountCategories().subscribe((count)=>{
        this.categoryCount=count;
    })
  }
  getMovieCount(){
    this.service.CountMovies().subscribe((count)=>{
      this.movieCount=count;
    })
  }
  getActorCount(){
    this.service.CountActors().subscribe((count)=>{
      this.actorCount=count;
    })
  }
  getSubCategoryCount(){
    this.service.CountSubCategories().subscribe((count)=>{
      this.subCategoryCount=count;
    })
  }
  getLinksCount(){
    this.service.CountLinks().subscribe((count)=>{
      this.linksCount=count;
    })
  }
  getUserCount(){
    this.service.CountUsers().subscribe((count)=>{
      this.usersCount=count;
    })
  }
}
