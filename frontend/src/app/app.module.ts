import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule, ToastrService } from 'ngx-toastr'

import {InputTextModule} from 'primeng/inputtext';
import {SliderModule} from 'primeng/slider';
import { CalendarModule } from 'primeng/calendar';
import {RatingModule, Rating} from 'primeng/rating';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AdministratorGuardService } from './services/auth/administrator-guard/administrator-guard.service';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddSurveyComponent } from './components/add-survey/add-survey.component';
import { SingleComponent } from './components/single/single.component';
import { WorkComponent } from './components/work/work.component';
import { ResultComponent } from './components/result/result.component';
import { ReportComponent } from './components/report/report.component';
import { MySurveysComponent } from './components/my-surveys/my-surveys.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthorGuardService } from './services/auth/author-guard/author-guard.service';
import { UserGuardService } from './services/auth/user-guard/user-guard.service';
import { FileSelectDirective } from 'ng2-file-upload';
import { AddUpdateUserComponent } from './components/add-update-user/add-update-user.component';

export function getToken(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    AddSurveyComponent,
    SingleComponent,
    WorkComponent,
    ResultComponent,
    ReportComponent,
    MySurveysComponent,
    ChangePasswordComponent,
    FileSelectDirective,
    AddUpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    SliderModule,
    RatingModule,
    CardModule,
    ButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({config: {
      tokenGetter: getToken
    }}),
    RouterModule,
    ToastrModule.forRoot()
  ],
  providers: [JwtHelperService, AdministratorGuardService, AuthorGuardService, UserGuardService, ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
