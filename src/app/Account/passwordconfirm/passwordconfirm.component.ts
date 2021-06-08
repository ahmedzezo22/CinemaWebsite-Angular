import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute ,Router} from '@angular/router';
import { resetPassword } from 'src/app/models/resetPassword';
import { RegisterServiceService } from 'src/app/sevices/register-service.service';

@Component({
  selector: 'app-passwordconfirm',
  templateUrl: './passwordconfirm.component.html',
  styleUrls: ['./passwordconfirm.component.css']
})
export class PasswordconfirmComponent implements OnInit {
  userForm:FormGroup;
  id:string;
  token:string
  
  constructor(private fb:FormBuilder,private router:Router,private route:ActivatedRoute,private service:RegisterServiceService) { }
  resetModel:resetPassword
  ngOnInit(): void {
  this.resetModel={
    ID:"",
    Token:"",
    password:""
  }
    this.route.queryParams.subscribe((param)=>{
      this.resetModel.ID=param['ID'];
      this.resetModel.Token=param['token'];
      if(this.resetModel.ID&& this.resetModel.Token){
        var storage=localStorage.getItem("ConfirmToken");
        if(storage!==this.resetModel.Token){
          this.router.navigate(['']).then(x=>{window.location.reload()})
        }
        // this.service.confirmEmail(id,token).subscribe(()=>{console.log("success")},(error)=>{console.log(error)})
        // console.log()
      }else{
        this.router.navigate(['']).then(x=>{window.location.reload()})
      }
     })
    this.userForm=this.fb.group({
     
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['',[Validators.required,Validators.minLength(6)]]
     },{validators:this.passwordValidator})
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
reset(){
 if(this.userForm.value.password!=null){
   this.resetModel.password=this.userForm.value.password
   this.service.updatePassword(this.resetModel).subscribe(()=>{
     console.log("success");
     this.router.navigate(['login'])
   },(error)=>{console.log(error)})
 }
}
}
