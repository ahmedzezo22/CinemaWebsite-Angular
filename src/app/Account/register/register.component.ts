import { AfterContentChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from 'src/app/models/register-model';
import { Users } from 'src/app/models/users';
import { RegisterServiceService } from 'src/app/sevices/register-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(private fb:FormBuilder,private service:RegisterServiceService) { }
 
  userForm:FormGroup;
  regForm:RegisterModel;
  user:Users[];
  success:string
  ngOnInit(): void {
    this.success='';
 this.user=[]
    this.regForm={
      userName:'',
      email:'',
      password:''
    }
    this.userForm=this.fb.group({
     email:['',[Validators.required,Validators.email]],
     password:['',[Validators.required,Validators.minLength(6)]],
     userName:['',Validators.required],
     confirmPassword:['',[Validators.required,Validators.minLength(6)]]
    },{validators:this.passwordValidator})
    this.allUsers();
  }
  register(){
    if(this.userForm.valid){
      this.ValidateRegisterModel();
      this.service.register(this.regForm).subscribe((data)=>{
       this.ngOnInit();
       this.success="تم ألتسجيل بنجاح برجاء التفعيل من خلال بريدك الالكترونى"
      },(error)=>{console.log(error)},()=>{

      })
    }
  }
  ValidateRegisterModel() {
    this.regForm.userName=this.userForm.value.userName;
    this.regForm.email=this.userForm.value.email;
    this.regForm.password=this.userForm.value.password;
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
     if(name.userName===userName){
       this.msg="اسم المستخدم موجود"
       return true;
     }
  }
  return false;
}
isEmailExist(){
  const email=this.userForm.get('email').value;
  for(const name of this.user){
    if(name.email===email){
      this.msg=" البريد الالكترونى موجود"
      return true;
    }
 }
 return false;
}
}

