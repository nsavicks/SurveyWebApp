import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import decode from 'jwt-decode'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SurveyApp';
  currentActive = "home";
  loggedInType = -1;

  constructor(private router: Router){
    
    var token = localStorage.getItem('token');
    
    if (token)
    {
      var tokenPayload = decode(token);
      this.loggedInType = tokenPayload.user.type;
    }
    else{
      this.loggedInType = -1;
    }

  }

  Logout(){
    
    console.log("POZVAN logout");
    localStorage.clear();
    this.loggedInType = -1;
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

  changeLoggedInType(type: number){
    this.loggedInType = type;
  }

}
