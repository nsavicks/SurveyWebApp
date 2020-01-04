import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/api/users.service';
import { AppComponent } from 'src/app/app.component';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

const URL = 'http://localhost:5000/api/upload';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent implements OnInit {

  user: User;
  username: string;
  errorMessage: string[] = [];
  photo: FileItem;
  foundUser: boolean;

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'photo'
  }); 

  constructor(private route: ActivatedRoute, private userService: UsersService,
          private appComponent: AppComponent,
          private router: Router,
          private toastr: ToastrService       
    ) {
    
    this.username = this.route.snapshot.paramMap.get('username');
    this.errorMessage = [];

    if (this.username) {
      this.foundUser = true;
      this.userService.getUserWithUsername(this.username).subscribe(
        user => {
          this.user = user;
        }
      );

    }
    else{
        this.user = new User();
        this.foundUser = false;
    }

  }

  ngOnInit() {

    this.appComponent.changeHeader("Add / Update user", "user-plus");

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.photo = file;

      console.log(this.photo.file.name.substr(this.photo.file.name.lastIndexOf('.')));
    };

    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
    };
  
  }

  Submit(){

    this.errorMessage = [];
    this.user.status = 1;

    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&.])(?=.{8,})");;

    if (!regex.test(this.user.password)){
      this.errorMessage.push("*Password doesn't match required form\n");
    }

    if (this.username){

      this.userService.getCountUsersWithEmail(this.user.email).subscribe(
        data => {

          if (data.count >= 2){
            this.errorMessage.push("*E-mail address is already associated with two accounts.");
          }
          
          if (this.errorMessage.length != 0){
            return;
          }

          this.userService.updateUser(this.user).subscribe(
            res => {
              this.toastr.success("User updated successfully.")
              this.router.navigate(['dashboard']);
            }
          );

        }
      )

      

    }
    else{
      
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
                  
                  this.photo.file.name = this.user.username + this.photo.file.name.substr(this.photo.file.name.lastIndexOf('.'))
  
                  this.uploader.uploadItem(this.photo);
  
                  this.user.picture = this.photo.file.name;
      
                  this.userService.addUser(this.user).subscribe(
                    user => {
                      this.toastr.success("User added successfully.")
                      this.router.navigate(['dashboard']);
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

}
