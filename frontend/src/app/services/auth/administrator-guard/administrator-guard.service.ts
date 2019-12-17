import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router'
import { AuthService } from '../auth.service'
import decode from 'jwt-decode' 

@Injectable({
  providedIn: 'root'
})
export class AdministratorGuardService implements CanActivate{
  
  constructor(public authService: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedType = 2;

    const token = localStorage.getItem('token');

    const tokenPayload = decode(token);

    console.log(tokenPayload);

    if (!this.authService.isAuthenticated() || tokenPayload.user.type != expectedType){
      console.log("USAO");
      this.router.navigate(['login']);
      return false;
    }
    else{
      return true;
    }

  }

}
