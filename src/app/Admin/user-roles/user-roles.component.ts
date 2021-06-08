import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/AdminServices/admin.service';
import { userRoleModel } from 'src/app/models/userRoleModel';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {
userRole:userRoleModel[];
  constructor(private service:AdminService,private router:Router) { }
 
  ngOnInit(): void {
    this.userRole=[]
    this.getUserRole();
}
getUserRole(){
  this.service.getUserRoles().subscribe((data)=>{
    this.userRole=data
  },()=>{})
}
editUserRole(userId:string,roleId:string){
  this.router.navigate(['edit-role',userId,roleId])
}
}
