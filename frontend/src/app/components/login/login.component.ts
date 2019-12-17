import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/api/users.service';
import { Router } from '@angular/router';

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

  constructor(private userService: UsersService, private router: Router) { }

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
                localStorage.setItem('token', token);

                if (user.type == 0){

                }
                else if (user.type == 1){

                }
                else if (user.type == 2){
                  this.router.navigate(['dashboard']);
                }
              }
            );

          }
        }
      }
    );

  }

}
