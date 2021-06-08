import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterServiceService } from 'src/app/sevices/register-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
forgetForm:FormGroup;
success:string;
error:string
  constructor(private fb:FormBuilder,private service:RegisterServiceService) { }

  ngOnInit(): void {
    this.error=""
    this.success=""
    this.forgetForm=this.fb.group({
      email:["",[Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]]
    })
  }
forget(){
 this.service.ResetPassword(this.forgetForm.value.email).subscribe((x)=>{
  var token=x['token'];
  localStorage.setItem("ConfirmToken",token)
  // console.log(token)
   this.success="تم ارسال رساله الى بريدك الالكترونى لتغيير كلمة المرور"
 },(error)=>{
  //  console.log(error)
   this.error=error.error
 })
}
}

