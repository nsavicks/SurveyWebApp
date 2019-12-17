import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SurveyApp';

  constructor(private router: Router){}

  logout(){
    console.log("POZVAN logout");
    localStorage.clear();
    this.router.navigate(['login']);

  }

}
