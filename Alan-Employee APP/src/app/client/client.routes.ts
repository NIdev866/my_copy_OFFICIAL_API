import { Routes } from '@angular/router';
import { DashboardComponent } from '../client-dashboard/dashboard.component';
import { CampaignsComponent } from '../client-campaigns/campaigns.component';
import { ClientRecruitmentComponent } from '../client-recruitment/client-recruitment.component';
import { LoginService } from '../services/login.service';




export const CLIENT_ROUTES: Routes = [
  { path: '', redirectTo:'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginService]},
  { path: 'campaigns', component: CampaignsComponent, canActivate: [LoginService]},
  { path: 'recruitment', component: ClientRecruitmentComponent, canActivate : [LoginService]}
  

];