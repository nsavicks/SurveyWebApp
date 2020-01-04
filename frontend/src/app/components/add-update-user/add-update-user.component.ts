import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/api/users.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent implements OnInit {

  user: User;
  username: string;
  errorMessage: string[] = [];

  constructor(private route: ActivatedRoute, private userService: UsersService,
          private appComponent: AppComponent        
    ) {
    
    this.username = this.route.snapshot.paramMap.get('username');
    this.errorMessage = [];

    if (this.username) {
      
      this.userService.getUserWithUsername(this.username).subscribe(
        user => {
          this.user = user;
        }
      );

    }
    else{
      this.user = new User();
      
    }

  }

  ngOnInit() {

    this.appComponent.changeHeader("Add / Update user", "user-plus");
  
  }

  Submit(){

    this.user.status = 1;

    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&.])(?=.{8,})");;

    if (!regex.test(this.user.password)){
      this.errorMessage.push("*Password doesn't match required form\n");
    }

    var jmbgRegex = new RegExp("[0-9]{13}");

    if (!jmbgRegex.test(this.user.jmbg)){
      this.errorMessage.push("*JMBG doesn't match required form");
    }

    if (this.username){

      this.userService.updateUser(this.user).subscribe(res => {

      });

    }
    else{
      
      this.user.picture = "defaultavatar.png";
      this.userService.addUser(this.user).subscribe(res => {

      });

    }

  }

}
