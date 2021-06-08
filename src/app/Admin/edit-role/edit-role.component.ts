import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/AdminServices/admin.service';
import { editUserModel } from 'src/app/models/editUserModel';
import { editUserRoleModel } from 'src/app/models/editUserRoleModel';
import { roleModel } from 'src/app/models/roleModel';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {
  userForm:FormGroup;
  userId:string;
  roleId:string;
  userName:string
  roles:roleModel[]
  userRole:editUserRoleModel
  constructor(private route:ActivatedRoute,private router:Router,private service:AdminService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.userRole={
      roleId:"",
      userId:""
    }
   this.userName=""
   this.roleId=""
    this.route.paramMap.subscribe((param)=>{
      var id =param.get('userId');
      var id1=param.get('roleId')
      if(id&&id1){
      this.service.Getuser(id).subscribe((data)=>{
       this.userId=id;      
       this.userName=data.userName
       this.roleId=id1
       this.addUserData();
       if(id !=this.userId||id1!=this.roleId){
        this.router.navigate(['/not-found']).then(x=>{window.location.reload()})

       }
      })
      this.service.getAllRoles().subscribe((x)=>{
        // debugger
        this.roles=x;
        this.addUserData();
      },()=>{})
     
    }else{
     this.router.navigate(['/not-found']).then(x=>{window.location.reload()})
    }
  })
  this.userForm=this.fb.group({
    userName:['',Validators.required],
    roleName:['',Validators.required]
  }) 
}
  addUserData() {
    this.userForm.setValue({
      roleName:this.roleId,
      userName:this.userName
    })
    
  }
  onRolesChange(){
    this.roleId=this.userForm.value.roleName;
  }
editRole(){
  if(this.userId&&this.roleId&&this.userForm.valid){
    this.userRole.roleId=this.roleId;
    this.userRole.userId=this.userId;
    this.service.editUserRole(this.userRole).subscribe((x)=>{
      this.router.navigate(['controlpanel'])
      sessionStorage.setItem("editUserRole","true");
        
    },(ex)=>console.log(ex))
  }
}
}
