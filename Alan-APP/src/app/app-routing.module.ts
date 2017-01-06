import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { GroupComponent } from "./group/group.component";
import { GROUP_ROUTES } from './group/group.routes';


const routes: Routes = [
	{ path: '', redirectTo: '/group', pathMatch: 'full' },
	{ path: 'group', component: GroupComponent, children: GROUP_ROUTES }
];

export const routing = RouterModule.forRoot(routes);