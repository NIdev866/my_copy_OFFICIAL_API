import { Routes } from '@angular/router'
import { AdminPasswordComponent } from '../admin-password/admin-password.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AdminAuthGuard } from '../services/admin-auth.guard';
import { ADMIN_DASHBOARD_ROUTES } from '../admin-dashboard/admin-dashboard.routes';

export const ADMIN_ROUTES: Routes = [
	{ path: 'createadmin', component: AdminPasswordComponent },
	{ path: 'login', component: AdminLoginComponent },
	{ path: 'dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuard] },
	
	{ 	path: 'dashboard', 
		component: AdminDashboardComponent, 
		children: ADMIN_DASHBOARD_ROUTES,
		canActivate: [AdminAuthGuard] 
	},

	{ path: 'dashboard/:id', component: AdminDashboardComponent, canActivate: [AdminAuthGuard] }
]