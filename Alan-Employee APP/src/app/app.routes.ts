import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { WorkerComponent } from './worker/worker.component';
import { JobseekerComponent } from './jobseeker/jobseeker.component';
import { ClientComponent } from './client/client.component';
import { CLIENT_ROUTES } from './client/client.routes';
import { JOBSEEKER_ROUTES } from './jobseeker/jobseeker.routes';
import { WORKER_ROUTES } from './worker/worker.routes';
import { LoginService } from './services/login.service';

// Define which component should be loaded based on the current URL
export const routes: Routes = [
  { path: '',  component: MenuComponent },
  { path: 'worker',   component: WorkerComponent, canLoad: [LoginService], children: WORKER_ROUTES},
  { path: 'jobseeker',   component: JobseekerComponent, canLoad: [LoginService], children: JOBSEEKER_ROUTES },
  { path: 'client',   component: ClientComponent, canLoad: [LoginService], children: CLIENT_ROUTES },

];