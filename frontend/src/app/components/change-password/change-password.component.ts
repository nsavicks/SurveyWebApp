import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { UsersService } from 'src/app/services/api/users.service';
import decode from 'jwt-decode'
import { User } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  currentUser: User;
  oldPassword: string;
  newPassword: string;
  repPassword: string;
  errorMessage: string;
  showError: boolean;

  constructor(
    private appComponent: AppComponent,
    private userService: UsersService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.errorMessage = "";
    this.showError = false;

    this.appComponent.changeHeader("Change password", "key");

    var token = localStorage.getItem('token');
    var tokenPayload = decode(token);
    this.currentUser = tokenPayload.user;

  }

  Change(){

    this.errorMessage = "";
    this.showError = false;

    if (this.currentUser.password != this.oldPassword){
      this.errorMessage = "Your old password is not correct!\n";
      this.showError = true;
      return;
    }

    if (this.newPassword != this.repPassword){
      this.errorMessage += "Your repeated password doesn't match!";
      this.showError = true;
      return;
    }

    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&.])(?=.{8,})");

    if (!regex.test(this.newPassword)){
      this.errorMessage += "*Password doesn't match required form";
      this.showError = true;
      return;
    }

    this.userService.changePassword(this.currentUser.username, this.newPassword).subscribe(
      user => {
        this.toastr.success("Password changed successfully.")
        this.appComponent.Logout();
      }
    )

  }

}
