import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncrDecrService } from './encr-decr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
token:string
expire:string
role:string
  constructor(private http:HttpClient,private service:EncrDecrService) { 
    if(this.loggin()){
    this.token=this.service.Decrypt(localStorage.getItem("token"));
    this.role=this.service.Decrypt(localStorage.getItem("role"));
    this.expire=this.service.Decrypt(localStorage.getItem("expires"));
    }
  }
  

  IsExpiredDate(day: string) {
    const dateNow = new Date();
    const dateExpire = new Date(Date.parse(day));
    if (dateExpire < dateNow) {
      return true;
    }
    return false;
  }

  loggin(){
    const token=!!localStorage.getItem("token");
    const expires=!!localStorage.getItem("expires");
    const role=!!localStorage.getItem("role");
  
    if(token&&expires&&role){return true;}
    return false;
    }

  GetRoleName(email: string) {
    return this.http.get('http://localhost:5000/Account/GetRoleName/' + email, { responseType: 'text' }).pipe();
  }

  checkUserClaim(token: string, role: string) {
  return this.http.get('http://localhost:5000/Account/checkUserClaim/' + token + '&' + role,
      { withCredentials: true }).pipe();
  }
}
