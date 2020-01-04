 import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdministratorGuardService } from './services/auth/administrator-guard/administrator-guard.service';
import { AddSurveyComponent } from './components/add-survey/add-survey.component';
import { AuthorGuardService } from './services/auth/author-guard/author-guard.service';
import { HomeComponent } from './components/home/home.component';
import { UserGuardService } from './services/auth/user-guard/user-guard.service';
import { SingleComponent } from './components/single/single.component';
import { WorkComponent } from './components/work/work.component';
import { ResultComponent } from './components/result/result.component';
import { ReportComponent } from './components/report/report.component';
import { MySurveysComponent } from './components/my-surveys/my-surveys.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AddUpdateUserComponent } from './components/add-update-user/add-update-user.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [UserGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AdministratorGuardService]},
  {path: 'home', component: HomeComponent, canActivate: [UserGuardService]},
  {path: 'add-survey-test', component: AddSurveyComponent, canActivate: [AuthorGuardService]},
  {path: 'single/:id', component: SingleComponent, canActivate: [UserGuardService]},
  {path: 'work/:id', component: WorkComponent, canActivate: [UserGuardService]},
  {path: 'result/:username/:surveyId', component: ResultComponent, canActivate: [UserGuardService]},
  {path: 'report/:id', component: ReportComponent, canActivate: [AuthorGuardService]},
  {path: 'my-surveys-tests', component: MySurveysComponent, canActivate: [AuthorGuardService]},
  {path: 'change-password', component: ChangePasswordComponent, canActivate: [UserGuardService]},
  {path: 'add-update-user', component: AddUpdateUserComponent, canActivate: [AdministratorGuardService]},
  {path: 'add-update-user/:username', component: AddUpdateUserComponent , canActivate: [AdministratorGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
