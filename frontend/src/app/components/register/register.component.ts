import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { UsersService } from '../../services/api/users.service';
import { Router } from '@angular/router'
import { User } from '../../models/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string[] = [];
  user: User;
  repPassword: string;

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.user = new User();
    this.errorMessage = [];
  }

  submitRegistration(){

    console.log(this.user);

    this.errorMessage = [];

    if (this.repPassword != this.user.password){
      this.errorMessage.push("*Repeated password doesn't match.");
    }

    // var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$");

    // if (!regex.test(this.user.password)){
    //   this.errorMessage += "*Password doesn't match required form\n";
    //   this.showError = true;
    // }

    var jmbgRegex = new RegExp("[0-9]{13}");

    if (!jmbgRegex.test(this.user.jmbg)){
      this.errorMessage.push("*JMBG doesn't match required form");
    }

    this.userService.getCountUsersWithEmail(this.user.email).subscribe(
      data => {

        if (data.count >= 2){
          this.errorMessage.push("*E-mail address is already associated with two accounts.");
        }

        this.userService.getUserWithUsername(this.user.username).subscribe(
          data => {

            if (data != null){
              this.errorMessage.push("*User with given username already exists.");
            }

            this.userService.getUserWithJMBG(this.user.jmbg).subscribe(
              data => {
                
                if (data != null){
                  this.errorMessage.push("*User with given JMBG already exists.");
                }

                if (this.errorMessage.length != 0){
                  return;
                }
    
                this.userService.addUser(this.user).subscribe(
                  user => {
                    this.router.navigate(['login']);
                  }
                );

              }
            )

          }
        );

      }
    );

  }
}
