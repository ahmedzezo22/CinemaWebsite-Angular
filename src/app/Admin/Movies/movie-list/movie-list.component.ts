import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { AdminService } from 'src/app/AdminServices/admin.service';
import { Movie } from 'src/app/models/MovieModel';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  formSearch:FormGroup
  movie:Movie[]
  item:number
  msg:string;
    constructor(private service:AdminService,private router:ActivatedRoute,private route:Router,private fb:FormBuilder) { }

    ngOnInit(): void {
      this.msg=''
      this.item=0;
     this.getAllMovies();
     this.movie=[]
     this.formSearch=this.fb.group({
      search:['',Validators.required]
     })
    }
    getAllMovies(){
      this.service.GetAllMovies().subscribe((list)=>{
        this.movie=list
      },(error)=>{console.log(error)
      })
    }
    editMovie(id:number){
     this.route.navigate(['/editmovie',id])
  }
  editLink(id:number){
    this.route.navigate(['/editlink',id])
  }
  editActors(id:number){
    this.route.navigate(['/editmovieactors',id])
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
       console.log(ids)

      this.service.deleteMovie(ids).subscribe(()=>{
        this.msg="تم الحذف بنجاح"
        $("#btnclose").trigger("click");
        this.getAllMovies();
      },(err)=>{console.log(err)})
    }

  }
  onSearch(){
    this.service.searchMovie(this.formSearch.value.search).subscribe((data)=>{
      this.movie=data;
    })
  }
  }
