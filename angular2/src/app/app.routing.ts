import { Routes , RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { WorkerComponent } from './worker/worker.component';
import { ClientComponent } from './client/client.component';
import { AuthGuard } from './services/auth.guard';
import { WORKER_ROUTES } from './worker/worker.routes';
import { ADMIN_ROUTES } from './admin/admin.routes';

const APP_ROUTES: Routes = [

	{path: '', component: AppComponent},
	{path: 'myprofile', component: WorkerComponent},
	{path: 'myprofile', component: WorkerComponent, children: WORKER_ROUTES},
		
		/*	{path: './create', component: CreatePasswordComponent},
		{path: './personaldetails', component: WorkerPersonalDetails, canActivate: [AuthGuardWorker]}*/
	{path: 'admin', component: AdminComponent},
	{path: 'admin', component: AdminComponent, children: ADMIN_ROUTES},		
	{path: 'signup', component: SignupComponent },
	{path: 'signin', component: SigninComponent },
	{path: 'client', component: ClientComponent }

];

export const routing = RouterModule.forRoot(APP_ROUTES); 