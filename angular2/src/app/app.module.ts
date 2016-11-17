//TO CREATE NEW APP = ng new app-name
//TO LAUNCH IN CLI = ng serve




import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
/*
import { MdCardModule } from '@angular2-material/card';

import { MdButtonModule } from '@angular2-material/button';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdInputModule } from '@angular2-material/input';*/

import { MaterialModule } from '@angular/material';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { WorkerComponent } from './worker/worker.component';
import { HeaderComponent } from './header/header.component';
import { WorkerPasswordComponent } from './worker-password/worker-password.component';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AuthService } from './services/auth.service';
import { AdminAuthService } from './services/adminAuthService';
import { JobseekerService } from './services/jobseekerService'

import { AuthGuard } from './services/auth.guard';
import { AdminAuthGuard } from './services/admin-auth.guard';

import { WorkerLoginComponent } from './worker-login/worker-login.component';
import { WorkerDashboardComponent } from './worker-dashboard/worker-dashboard.component';
import { LoginComponent } from './login/login.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminPasswordComponent } from './admin-password/admin-password.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminCampaignsComponent } from './admin-campaigns/admin-campaigns.component';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { ViewCampaignsComponent } from './view-campaigns/view-campaigns.component';
import { ApplicantsComponent } from './applicants/applicants.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SigninComponent,
    SignupComponent,
    AdminComponent,
    ClientComponent,
    WorkerComponent,
    HeaderComponent,
    WorkerPasswordComponent,
    WorkerLoginComponent,
    WorkerDashboardComponent,
    LoginComponent,
    AdminDashboardComponent,
    AdminPasswordComponent,
    AdminLoginComponent,
    AdminCampaignsComponent,
    AddCampaignComponent,
    ViewCampaignsComponent,
    ApplicantsComponent
   
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MaterialModule.forRoot()
    /*
    MdCardModule.forRoot(),
    MdButtonModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdInputModule.forRoot()*/
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    JobseekerService,
    AdminAuthService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


