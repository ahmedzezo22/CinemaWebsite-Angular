import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../sevices/auth.service';
import { EncrDecrService } from '../sevices/encr-decr.service';
import { RegisterServiceService } from '../sevices/register-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
title="Cinema Movie"
  constructor(private service:RegisterServiceService,private route:Router,private auth:AuthService,private enc:EncrDecrService) { }
  ngOnInit(): void {
    if(this.loggin()){
  if(this.auth.IsExpiredDate(this.auth.expire)===true){
    this.logout();
  }
  this.auth.checkUserClaim(this.auth.token,this.auth.role).subscribe(()=>{
    console.log("user authorized");
  },(error)=>{
    console.log(error);
    this.logout()
  })
 
}
}
  logout(){
    this.service.LogOut().subscribe(()=>{
      // localStorage.removeItem("token");
      // localStorage.removeItem("expires");
      // localStorage.removeItem("role");
      localStorage.clear();
      this.route.navigate([''])},(error)=>{console.log(error);
    })
  }
  loggin(){
  const token=!!localStorage.getItem("token");
  const expires=!!localStorage.getItem("expires");
  const role=!!localStorage.getItem("role");

  if(!token&&!expires&&!role){return false;}
  return true;
  }
  
 isAdmin(){

   const role=localStorage.getItem('role');
   if(role){
     if(this.enc.Decrypt(role)==="Admin"){
      return true;
   }
    
   }
  return false;
 }
}
