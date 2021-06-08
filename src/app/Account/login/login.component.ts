import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/sevices/auth.service';
import { EncrDecrService } from 'src/app/sevices/encr-decr.service';
import { RegisterServiceService } from 'src/app/sevices/register-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
success:string;
  constructor(private fb:FormBuilder,private service:RegisterServiceService,private route:Router,private auth:AuthService,
    private encrypt:EncrDecrService) { }
loginForm:FormGroup
logModel:loginModel
  ngOnInit(): void {
    this.success="";
    this.logModel={
      email:'',
      password:'',
      rememberMe:false
    }
    this.loginForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
      rememberMe:false

  });
  
}
login(){
  // debugger;
  if(this.loginForm.valid){
   this.ValidateUserLogin();
    this.service.userLogin(this.logModel).subscribe(()=>{
      // const email=this.loginForm.value.email;
      // const rem=this.loginForm.value.rememberMe;
      // this.auth.installStorage(email,rem);

      const rem=!!this.loginForm.value.rememberMe
      const day=new Date();
      if(rem){
        day.setDate(day.getDate()+10)
      }else{day.setMinutes(day.getMinutes()+30)}
      localStorage.setItem("token",this.encrypt.Encrypt(this.logModel.email));
      localStorage.setItem("expires",this.encrypt.Encrypt(day.toString()));
      localStorage.setItem("name",this.logModel.email.substring(0,this.logModel.email.lastIndexOf("@")).toString())
     this.service.getRole(this.loginForm.value.email).subscribe((data)=>{
       localStorage.setItem("role",this.encrypt.Encrypt(data.toString()))
     })
     this.route.navigate([''])
    
    },(error)=>{console.log(error.error);
      this.success=error.error;
    })
  }
}
ValidateUserLogin() {
  this.logModel.email=this.loginForm.value.email;
  this.logModel.password=this.loginForm.value.password
  this.logModel.rememberMe=this.loginForm.value.rememberMe;
 
 }
}

 
