import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router'
import { AuthService } from '../auth.service'
import decode from 'jwt-decode' 

@Injectable({
  providedIn: 'root'
})
export class AuthorGuardService implements CanActivate{

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedType = 1;

    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['login']);
      return false;
    }

    const tokenPayload = decode(token);

    console.log(tokenPayload);

    if (!this.authService.isAuthenticated() || tokenPayload.user.type < expectedType){
    
      this.router.navigate(['home']);
      return false;
    }
    else{
      return true;
    }

  }
}
