import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import decode from 'jwt-decode'
import { ToastrService } from 'ngx-toastr';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SurveyApp';
  currentActive = "home";
  loggedInType = -1;
  icon: string;
  header: string;
  user: User = null;

  constructor(private router: Router, private toastr: ToastrService){
    
    toastr.toastrConfig.positionClass = "toast-bottom-right";

    var token = localStorage.getItem('token');
    
    if (token)
    {
      var tokenPayload = decode(token);
      this.loggedInType = tokenPayload.user.type;
      this.user = tokenPayload.user;
    }
    else{
      this.loggedInType = -1;
    }

  }

  Logout(){
    
    localStorage.clear();
    this.loggedInType = -1;
    this.user = null;
    this.currentActive = "home";
    this.router.navigate(['login']);
  }

  ChangeNavigationActive(newPage: string){
    
    var oldNav = document.getElementById('nav-' + this.currentActive);
    var newNav = document.getElementById('nav-' + newPage);

    if (oldNav != null)
      oldNav.classList.remove('active');
    if (newNav != null)
      newNav.classList.add('active');

    this.currentActive = newPage;
  }

  changeLoggedInType(user: User){
    this.loggedInType = user.type;
    this.user = user;
  }

  changeHeader(header, icon){
    this.header = header;
    this.icon = icon;
  }

}
