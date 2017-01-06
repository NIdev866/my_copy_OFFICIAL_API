import { Routes } from '@angular/router';
import { JobseekerDashboardComponent } from '../jobseeker-dashboard/jobseeker-dashboard.component';
import { JobseekerCampaignsComponent } from '../jobseeker-campaigns/jobseeker-campaigns.component';
import { LoginService } from '../services/login.service';



export const JOBSEEKER_ROUTES: Routes = [
  { path: '', redirectTo:'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: JobseekerDashboardComponent, canActivate: [LoginService]},
  { path: 'campaigns', component: JobseekerCampaignsComponent, canActivate: [LoginService]}
  

];