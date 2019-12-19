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

  successMessage: string = "You have succesfully registered. You can now login.";
  showSuccess: boolean = false;
  errorMessage: string = "";
  showError: boolean = false;
  user: User;
  repPassword: string;

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.user = new User();
    this.errorMessage = "";
    this.showSuccess = false;
    this.showError = false;
  }

  submitRegistration(){

    console.log(this.user);

    this.errorMessage = "";
    this.showError = false;
    this.showSuccess = false;

    if (this.repPassword != this.user.password){
      this.errorMessage += "*Repeated password doesn't match.\n";
      this.showError = true;
    }

    // var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$");

    // if (!regex.test(this.user.password)){
    //   this.errorMessage += "*Password doesn't match required form\n";
    //   this.showError = true;
    // }

    var jmbgRegex = new RegExp("[0-9]{13}");

    if (!jmbgRegex.test(this.user.jmbg)){
      this.errorMessage += "*JMBG doesn't match required form";
      this.showError = true;
    }

    this.userService.getCountUsersWithEmail(this.user.email).subscribe(
      data => {

        if (data.count >= 2){
          this.errorMessage += "*E-mail address is already associated with two accounts.";
          this.showError = true;
        }

        this.userService.getUserWithUsername(this.user.username).subscribe(
          data => {
            
            if (data != null){
              this.errorMessage += "*User with given username already exists.";
              this.showError = true;
            }

            if (this.showError){
              return;
            }

            this.userService.addUser(this.user).subscribe(
              user => {
                this.showSuccess = true;
              }
            );

          }
        );

      }
    );

  }
}
