import { Routes } from '@angular/router';
import { WorkerDashboardComponent } from '../worker-dashboard/worker-dashboard.component';
import { LoginService } from '../services/login.service';



export const WORKER_ROUTES: Routes = [
  { path: '', redirectTo:'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: WorkerDashboardComponent, canActivate: [LoginService]}
  

];