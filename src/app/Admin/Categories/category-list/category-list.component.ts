import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/AdminServices/admin.service';
import { Caregory } from 'src/app/models/categoryModel';
import * as $ from 'jquery';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
category:Caregory[]
  constructor(private router:Router,private service:AdminService) { }
msg:string;
item:number;
  ngOnInit(): void {
    this.category=[];
    this.msg=''
    this.item=0;
    this.getCategoryList();
  }
getCategoryList(){
  this.service.getAllCategories().subscribe((data)=>{
    this.category=data
  })
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
editCategory(id:number,name:string){
  this.router.navigate(['/editcategory',id,name])
}
deleteCategory(id:number){

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
    
    this.service.deleteAllCategory(ids).subscribe(()=>{
      this.msg="تم الحذف بنجاح"
      $("#btnclose").trigger("click");
      this.getCategoryList();
    },(err)=>{console.log(err)})
  }
}
}
