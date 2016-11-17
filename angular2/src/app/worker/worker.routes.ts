import { Routes } from '@angular/router'
import { WorkerPasswordComponent } from '../worker-password/worker-password.component';
import { WorkerLoginComponent } from '../worker-login/worker-login.component';
import { WorkerDashboardComponent } from '../worker-dashboard/worker-dashboard.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../services/auth.guard';

export const WORKER_ROUTES: Routes = [
	{ path: 'createpassword', component: WorkerPasswordComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'login/:id', component: WorkerLoginComponent },
	{ path: 'dashboard', component: WorkerDashboardComponent, canActivate: [AuthGuard] },
	{ path: 'dashboard/:id', component: WorkerDashboardComponent, canActivate: [AuthGuard] },
	{ path: 'jobseekers/:id', component: WorkerDashboardComponent }


]