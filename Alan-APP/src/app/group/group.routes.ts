import { Routes } from '@angular/router';
import { JobseekerListComponent } from '../jobseeker-list/jobseeker-list.component';
import { GroupStartComponent } from './group-start.component';
import { JOBSE_ROUTES } from '../jobseeker-list/jobseeker-list.routes'
export const GROUP_ROUTES: Routes = [
	
	{ path: '', component: GroupStartComponent},
	{ path: ':name', component: JobseekerListComponent, children: JOBSE_ROUTES}
	
];