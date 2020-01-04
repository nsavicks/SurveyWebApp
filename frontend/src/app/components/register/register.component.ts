import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { UsersService } from '../../services/api/users.service';
import { Router } from '@angular/router'
import { User } from '../../models/user.model';
import { FileUploader, FileItem } from 'ng2-file-upload';

const URL = 'http://localhost:5000/api/upload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string[] = [];
  user: User;
  repPassword: string;
  photo: FileItem;

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'photo'
  }); 

  @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.user = new User();
    this.errorMessage = [];

    this.addRecaptchaScript();

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.photo = file;

      console.log(this.photo.file.name.substr(this.photo.file.name.lastIndexOf('.')));
    };

    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
    };
  }

  submitRegistration(){

    this.errorMessage = [];

    var captcha = grecaptcha.getResponse();

    if (!captcha){
      this.errorMessage.push("*Captcha not verified.");
    }

    if (this.repPassword != this.user.password){
      this.errorMessage.push("*Repeated password doesn't match.");
    }

    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&.])(?=.{8,})");;

    if (!regex.test(this.user.password)){
      this.errorMessage.push("*Password doesn't match required form\n");
    }

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
                
                this.photo.file.name = this.user.username + this.photo.file.name.substr(this.photo.file.name.lastIndexOf('.'))

                this.uploader.uploadItem(this.photo);

                this.user.picture = this.photo.file.name;
    
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

  renderReCaptch() {
    window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
      'sitekey' : '6Le_HswUAAAAAG7q6AR6UAhx9x9BO4Bd19yPf76Z',
      'callback': (response) => {
          console.log(response);
      }
    });
  }
 
  addRecaptchaScript() {
 
    window['grecaptchaCallback'] = () => {
      this.renderReCaptch();
    }
 
    (function(d, s, id, obj){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { obj.renderReCaptch(); return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));
 
  }

}
