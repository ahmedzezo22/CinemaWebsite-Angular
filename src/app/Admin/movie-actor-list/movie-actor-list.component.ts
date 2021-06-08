import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/AdminServices/admin.service';
import { MovieActor } from 'src/app/models/movieActor';
import * as $ from 'jquery';

@Component({
  selector: 'app-movie-actor-list',
  templateUrl: './movie-actor-list.component.html',
  styleUrls: ['./movie-actor-list.component.css']
})
export class MovieActorListComponent implements OnInit {

  movieActors:MovieActor[];
  msg:string="";
  item:number=0;
  formSearch:FormGroup;
    constructor(private service:AdminService,private router:Router,private fb:FormBuilder) { }

    ngOnInit(): void {
      this.formSearch=this.fb.group({
        search:['',Validators.required]
      })
      this.movieActors=[]
      this.getAllMovieActors();
    }
    getAllMovieActors(){
      this.service.getAllMovieActors().subscribe((data)=>{
        this.movieActors=data;
      },(err)=>{
         console.log(err)
      })
    }
    editMovieActor(id:number){
      this.router.navigate(['editmovieactor',id])
    }
    selectAll(){
      {
       var tbl = $('#tbl');
       var header = tbl.find('thead .ckheader');
       var item = tbl.find('tbody .ckitem');

       $(function () {
         item.on('change', function () {
           if ($(this).is(':checked')) {
             $(this).closest('tr').addClass('NewRowColor');
           }
           else {
             $(this).closest('tr').removeClass('NewRowColor');
           }
         });

         header.change(function () {
           var c = this.checked;
           item.prop("checked", c);
           item.trigger('check');
           if ($(this).is(':checked')) {
             $(item).closest('tr').addClass('NewRowColor');
           }
           else {
             $(item).closest('tr').removeClass('NewRowColor');
           }
         });
       });
     }
   }
   isDelete(){
     var checkboxes = document.getElementsByClassName('ckitem');
     if (checkboxes.length > 0) {
       for (let i = 0; i < checkboxes.length; i++) {
         if ($(checkboxes[i]).is(":checked")) {
           return true;
         }
       }
     }
     return false;
   }
   DeleteCount(){
     var count=$('.ckitem:checked').length;
     this.item=count;
   }
   deleteConfirm(){
     var checkBox=document.getElementsByClassName('ckitem')
     var ids=[]
     if(checkBox.length>0){
       for (let i = 0; i < checkBox.length; i++) {
         if($(checkBox[i]).is(":checked")){
           var id=$(checkBox[i]).val();
          console.log(id)
           ids.push(id);
         }
       }


       this.service.deleteMovieActors(ids).subscribe(()=>{
         this.msg="تم الحذف بنجاح"
         $("#btnclose").trigger("click");
         this.getAllMovieActors();
       },(err)=>{console.log(err)})
     }

   }
   onSearch(){
     this.service.searchMovieActors(this.formSearch.value.search).subscribe((data)=>{
       this.movieActors=data;
     })
   }

}
