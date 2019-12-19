import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/api/users.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  showError: boolean = false;
  errorMessage: string = "";

  constructor(private userService: UsersService, private router: Router, private appComponent: AppComponent) { }

  ngOnInit() {
    this.showError = false;
    this.errorMessage = "";
  }

  login(){

    this.userService.getUserWithUsername(this.username).subscribe(
      user => {
        console.log(user);
        if (user == null){
          this.showError = true;
          this.errorMessage = "*User with given username doesn't exist.";
          return;
        }
        else{
          if (user.password != this.password){
            this.showError = true;
            this.errorMessage = "*Password is not correct.";
          }
          else{

            this.userService.getToken(user).subscribe(
              token => {
                console.log(token);
                localStorage.setItem('token', token.toString());
                this.appComponent.changeLoggedInType(user.type);
                this.router.navigate(['home']);
              }
            );

          }
        }
      }
    );

  }

}
