import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { resetPassword } from 'src/app/models/resetPassword';
import { RegisterServiceService } from 'src/app/sevices/register-service.service';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent implements OnInit {
  msg:string=""
  constructor(private route:ActivatedRoute,private service:RegisterServiceService) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe((param)=>{
     const id=param['ID'];
     const token=param['token'];
     if(id&& token){
       this.service.confirmEmail(id,token).subscribe(()=>{this.msg="تم تفعيل حسابك بنجاح"},(error)=>{console.log(error)})
       console.log()
     }
    })
  }

}
