import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@angular/material';
import { MdSnackBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { ClientComponent } from './client/client.component';
import { DashboardComponent } from './client-dashboard/dashboard.component';
import { CampaignsComponent } from './client-campaigns/campaigns.component';
import { ClientCampaignsAddComponent } from './client-campaigns-add/client-campaigns-add.component';

import { JobseekerComponent } from './jobseeker/jobseeker.component';
import { JobseekerDashboardComponent } from './jobseeker-dashboard/jobseeker-dashboard.component';
import { JobseekerCampaignsComponent } from './jobseeker-campaigns/jobseeker-campaigns.component';

import { WorkerComponent } from './worker/worker.component';
import { WorkerDashboardComponent } from './worker-dashboard/worker-dashboard.component';

import { MenuComponent } from './menu/menu.component';

import { CampaignService } from './services/campaign.service';
import { ClientService } from './services/client.service';
import { PeopleService } from './services/people.service';
import { LoginService } from './services/login.service';

import { CampaignsViewComponent } from './campaigns-view/campaigns-view.component';

import { MaterializeDirective } from "angular2-materialize";
import { ClientRecruitmentComponent } from './client-recruitment/client-recruitment.component';
import { ViewPersonComponent } from './view-person/view-person.component';
import { ApolloModule } from 'angular2-apollo';
import ApolloClient , { createNetworkInterface } from 'apollo-client';
import { TestGLComponent } from './test-gl/test-gl.component'

const client = new ApolloClient({
  networkInterface: createNetworkInterface(
    'https://g945nkna49.execute-api.eu-west-1.amazonaws.com/stage1/graphql'
    )
});


@NgModule({
  declarations: [
    AppComponent,
    WorkerComponent,
    JobseekerComponent,
    ClientComponent,
    MenuComponent,
    DashboardComponent,
    CampaignsComponent,
    WorkerDashboardComponent,
    JobseekerDashboardComponent,
    JobseekerCampaignsComponent,
    CampaignsViewComponent,
    ClientCampaignsAddComponent,
    MaterializeDirective,
    ClientRecruitmentComponent,
    ViewPersonComponent,
    TestGLComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    MaterialModule.forRoot(),
    ApolloModule.withClient(client)
  ],
  providers: [CampaignService, ClientService, PeopleService, LoginService, MdSnackBarModule, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
