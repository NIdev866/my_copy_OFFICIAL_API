import { Routes } from '@angular/router'
//import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AddCampaignComponent } from '../add-campaign/add-campaign.component';
import { ViewCampaignsComponent } from '../view-campaigns/view-campaigns.component';
import { ApplicantsComponent } from '../applicants/applicants.component';
import { AdminAuthGuard } from '../services/admin-auth.guard';

export const ADMIN_DASHBOARD_ROUTES: Routes = [
	{ path: 'add-campaign', component: AddCampaignComponent, canActivate: [AdminAuthGuard] },
	{ path: 'view-campaigns', component: ViewCampaignsComponent, canActivate: [AdminAuthGuard] },
	{ path: 'applicants', component: ApplicantsComponent, canActivate: [AdminAuthGuard] },

];