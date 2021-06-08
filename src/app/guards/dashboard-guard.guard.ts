import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../sevices/auth.service';
import { EncrDecrService } from '../sevices/encr-decr.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuardGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router,private enc:EncrDecrService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    //  debugger;
      // const role=this.enc.Decrypt(localStorage.getItem("role"));
      // const email=this.auth.token
      const role=localStorage.getItem("role")
      const email=localStorage.getItem("token")
     
      if(role){
      if(this.enc.Decrypt(role).toLowerCase()!=='admin'){
           this.router.navigate(['access-denied']);
      }
      return true;
      }else{
        if(!role || !email){this.router.navigate(['not-found'])}
      }
      return false;
  }
  
}
