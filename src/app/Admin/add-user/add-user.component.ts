import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/AdminServices/admin.service';
import { editUserModel } from 'src/app/models/editUserModel';
import { UserModel } from 'src/app/models/UserModel';
import { Users } from 'src/app/models/users';
import { EncrDecrService } from 'src/app/sevices/encr-decr.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private fb:FormBuilder,private service:AdminService,private route:ActivatedRoute,private enc:EncrDecrService) { }
 
  userForm:FormGroup;
  regForm:UserModel;
  user:Users[];
  userGet:Users
  success:string
  error:string
  title:string
  button:string
  isEditMode:boolean;
  editUserData:editUserModel
  id:string;
  ngOnInit(): void {
    this.success='';
    this.error=''
 this.user=[]
 this.userGet=null;
    this.regForm={
      userName:'',
      email:'',
      password:'',
      country:'',
      emailConfirmed:false,
      id:null,
      phoneNumber:'',
    
    }
    this.userForm=this.fb.group({
     email:['',[Validators.required,Validators.email]],
     password:['',[Validators.required,Validators.minLength(6)]],
     userName:['',Validators.required],
     confirmPassword:['',[Validators.required,Validators.minLength(6)]],
     phoneNumber:['',Validators.required],
     country:['',Validators.required],
     emailConfirmed:[false]

    },{validators:this.passwordValidator})
    this.allUsers();
    this.route.paramMap.subscribe((param)=>{
      var id =param.get('id');
      if(id){this.button="تعديل المستخدم "
      this.title="تعديل المستخدم"
      this.service.Getuser(id).subscribe((data)=>{
        this.userGet=data;
         this.AddUserData()
         this.id=id;
        //  console.log(this.userGet)
      })
    }else{
      this.button="اضافة مستخدم جديد"
      this.title=" اضافة مستخدم"
    }
    })
    this.editUserData={
      id:'',
      country:'',
      email:'',
      emailConfirmed:false,
      phoneNumber:'',
      password:'',
      userName:''
    }
  }
  AddUserData() {
    this.isEditMode=true; 
    if(this.userGet!=null){
      this.userForm.setValue({
        email:this.userGet.email,
        password:this.userGet.passwordHash,
        userName:this.userGet.userName,
        confirmPassword:this.userGet.passwordHash,
        phoneNumber:this.userGet.phoneNumber,
        country:this.userGet.country,
        emailConfirmed:this.userGet.emailConfirmed
      })
    }
  }
  AddUser(){
    // debugger;
  if(this.userForm.valid){
    if(!this.isEditMode){
        this.ValidateRegisterModel();
        this.service.addUser(this.regForm).subscribe((data)=>{
         this.ngOnInit();
         if(data['emailConfirmed']===false){
         this.success="تم ألتسجيل بنجاح برجاء التفعيل من خلال بريدك الالكترونى"}
         else{
  
          this.success="تم ألتسجيل بنجاح وتفعيل  البريد الالكترونى"}
  
        },(error)=>{this.error=error},()=>{
  
        })
     }else{
    this.editUserData.id=this.id;
    this.editUserData.country=this.userForm.value.country;       
    this.editUserData.email=this.userForm.value.email;       
    this.editUserData.password=this.userForm.value.password;       
    this.editUserData.phoneNumber=this.userForm.value.phoneNumber;       
    this.editUserData.userName=this.userForm.value.userName;       
    this.editUserData.emailConfirmed=this.userForm.value.emailConfirmed;    
    this.service.editUser(this.editUserData).subscribe(()=>{
      this.success="تم تعديل البيانات بنجاح"
    },()=>{})   
     }
  }
  }
  ValidateRegisterModel() {
    this.regForm.userName=this.userForm.value.userName;
    this.regForm.email=this.userForm.value.email;
    this.regForm.password=this.userForm.value.password;
    this.regForm.emailConfirmed=this.userForm.value.emailConfirmed;
    this.regForm.phoneNumber=this.userForm.value.phoneNumber;
    this.regForm.country=this.userForm.value.country;
  }
  //password validatior
 passwordValidator(form:FormGroup){
   if(form.get('password').value!=='' && form.get('confirmPassword').value!=='' &&form.get('confirmPassword').value.length>5&&form.get('password').value.length>5 ){
  return form.get('password').value===form.get('confirmPassword').value?null:{'mismatch':true}}
}
//pattern of password
regex:RegExp;
msg=""
passwordPattern(){
  
  let pass=this.userForm.value.password;
  if(pass!==''&&pass.length>5){
     this.regex=new RegExp('[a-z]');
     if(!this.regex.test(pass)){
     this.msg="كلمة المرور يجب ان تحتوى على حرف صغير"
       return false;
     }
     this.regex=new RegExp('[A-Z]');
     if(!this.regex.test(pass)){
     this.msg="كلمة المرور يجب ان تحتوى على حرف كبير"
       return false;
     }
     this.regex=new RegExp('[~!@()+<>{}]');
     if(!this.regex.test(pass)){
     this.msg="كلمة المرور يجب ان تحتوى على حرف مميز واحد على الاقل"
       return false;
     }
     this.regex=new RegExp('[0-9]');
     if(!this.regex.test(pass)){
     this.msg="كلمة المرور يجب ان تحتوى على رقم  واحد على الاقل"
       return false;
     }

  }
  return true;
}
allUsers(){
  this.service.GetAllUsers().subscribe((list)=>{
    this.user=list;
    // console.log(this.user)
  },(error)=>{console.log(error)})
}
isUserNameExist(){
  const userName=this.userForm.get('userName').value;
  for(const name of this.user){
     if(name.userName===userName &&!this.isEditMode){
       this.msg="اسم المستخدم موجود"
       return true;
     }else if(this.isEditMode && name.userName===userName &&name.id!==this.userGet.id){
      this.msg="اسم المستخدم موجود" 
      return true;}
  }
  return false;
}
isEmailExist(){
  const email=this.userForm.get('email').value;
  for(const name of this.user){
    if(name.email===email&&!this.isEditMode){
      this.msg=" البريد الالكترونى موجود"
      return true;
    }else if(this.isEditMode && name.email===email &&name.id!==this.userGet.id){
      this.msg=" البريد الالكترونى موجود"
      return true;}
 }
 return false;
}
}
