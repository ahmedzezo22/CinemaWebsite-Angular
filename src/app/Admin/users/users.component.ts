import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/AdminServices/admin.service';
import { Users } from 'src/app/models/users';
import * as $ from 'jquery';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
user:Users[]
item:number
msg:string;
  constructor(private service:AdminService,private router:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.msg=''
    this.item=0;
   this.getAllUsers();
  }
  getAllUsers(){
    this.service.GetAllUsers().subscribe((list)=>{
      this.user=list
    },()=>{

    })
  }
editUser(id:string){
   this.route.navigate(['/edituser',id])
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
    
    this.service.deleteAll(ids).subscribe(()=>{
      this.msg="???? ?????????? ??????????"
      $("#btnclose").trigger("click");
      this.getAllUsers();
    },(err)=>{console.log(err)})
  }
}
}
