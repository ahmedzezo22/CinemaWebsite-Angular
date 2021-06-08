import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginModel } from '../models/loginModel';
import { RegisterModel } from '../models/register-model';
import { resetPassword } from '../models/resetPassword';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
baseUrl='http://localhost:5000/';
headers={
  headers:new HttpHeaders({
  'Content-Type':'Application/json'
  }),
  withCredentials:true
}
  constructor(private http:HttpClient) {}
  register(reg:RegisterModel):Observable<RegisterModel>{
  return this.http.post<RegisterModel>(`${this.baseUrl}Account/register`,reg);
  }
  GetAllUsers():Observable<Users[]>{
    return this.http.get<Users[]>(`${this.baseUrl}Account/GetAllUsers`);
    }
  userLogin(login:loginModel):Observable<loginModel>{
      return this.http.post<loginModel>(`${this.baseUrl}Account/Login`,login,this.headers);
      }
      LogOut(){
        return this.http.get(`${this.baseUrl}Account/Logout`,{withCredentials:true});
        }
        //get role Name
        getRole(email:string){
          return this.http.get(`${this.baseUrl}Account/GetRoleName/${email}`,{responseType:"text"})
        }
        confirmEmail(id:string,token:string){
         return this.http.get(`${this.baseUrl}Account/RegiterationConfirm?ID=${id}&token=${token}`).pipe();
        }
        ResetPassword(email:string){
          return this.http.get(`${this.baseUrl}Account/forgetpassword/${email}`).pipe();
        }
        //update Password
        updatePassword(reset:resetPassword):Observable<resetPassword>{
          return this.http.post<resetPassword>(`${this.baseUrl}Account/ResetPassword`,reset,this.headers);
          }
}
