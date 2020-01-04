import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model'; 
import { UsersService } from '../../services/api/users.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pendingUsers: User[];
  allUsers: User[];
  allUsername: string;
  pendingUsername: string;

  constructor(private usersService: UsersService, private appComponent: AppComponent) { }

  ngOnInit() {

    this.appComponent.changeHeader("Dashboard", "shield");

    this.usersService.getAllUsers().subscribe(
      users => {
        this.allUsers = users;
      }
    );

    this.usersService.getPendingUsers().subscribe(
      users => {
        this.pendingUsers = users;
      }
    )

  }

  Accept(user: User){
    
    this.usersService.acceptUser(user.username).subscribe(
      user => {
        this.usersService.getPendingUsers().subscribe(
          users => {
            this.pendingUsers = users;
          }
        )
      }
    );

  }

  Delete(user: User){

    this.usersService.deleteUser(user.username).subscribe(
      code => {
        
        this.usersService.getAllUsers().subscribe(
          users => {
            this.allUsers = users;
          }
        );
    
        this.usersService.getPendingUsers().subscribe(
          users => {
            this.pendingUsers = users;
          }
        );

      }
    )

  }

  SearchAll(){

    if (!this.allUsername){
      this.usersService.getAllUsers().subscribe(
        users => {
          this.allUsers = users;
        }
      );
    }
    else{
      this.usersService.getUsersWithUsernameLike(this.allUsername).subscribe(
        users => {
          this.allUsers = users;
        }
      );
    }
  }

  SearchPending(){
    if (!this.pendingUsername){
      this.usersService.getPendingUsers().subscribe(
        users => {
          this.pendingUsers = users;
        }
      )
    }
    else{
      this.usersService.getPendingUsersWithUsernameLike(this.pendingUsername).subscribe(
        users => {
          this.pendingUsers = users;
        }
      );
    }
    
  }

}
