import { Routes } from '@angular/router';
import { JobseekerListStartComponent } from '../jobseeker-list/jobseeker-list-start.component';
import { JobseekerDetailsComponent } from '../jobseeker-details/jobseeker-details.component';

export const JOBSE_ROUTES: Routes = [
	
	{ path: '', component: JobseekerListStartComponent},
	{ path: 'jobseeker/:id', component: JobseekerDetailsComponent}
];