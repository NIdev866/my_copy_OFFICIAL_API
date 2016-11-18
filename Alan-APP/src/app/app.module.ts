import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routing } from './app-routing.module';

import { AppComponent } from './app.component';
import { GroupComponent } from './group/group.component';
import { JobseekerListComponent } from './jobseeker-list/jobseeker-list.component';
import { GroupStartComponent } from './group/group-start.component';
import { GroupSearchPipe } from './group-search.pipe';
import { SeekerSearchPipe } from './seeker-search.pipe';
import { JobseekerService } from './jobseeker.service';
import { JobseekerListStartComponent } from './jobseeker-list/jobseeker-list-start.component';
import { JobseekerDetailsComponent } from './jobseeker-details/jobseeker-details.component';
import { JobseekerSelectionService } from './jobseeker-selection.service';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {MaterializeDirective} from "angular2-materialize";
import { MaterialModule } from '@angular/material';
import { FacebookService } from 'ng2-facebook-sdk/dist';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';
import { FacebookControllerComponent } from './facebook-controller/facebook-controller.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    JobseekerListComponent,
    GroupStartComponent,
    GroupSearchPipe,
    SeekerSearchPipe,
    JobseekerListStartComponent,
    JobseekerDetailsComponent,
    MaterializeDirective,
    TabsComponent,
    TabComponent,
    FacebookControllerComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    RouterModule,
    MaterialModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCycQAIpvF3KkEkEQXJIHdzrV9rgoPDuXk'})
  ],
  providers: [JobseekerService, JobseekerSelectionService, FacebookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
