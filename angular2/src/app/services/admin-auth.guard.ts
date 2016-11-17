
import { Injectable } from '@angular/core';
import { CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AdminAuthService } from './adminAuthService';


 
@Injectable()
export class AdminAuthGuard implements CanActivate{

	constructor(private adminAuthService: AdminAuthService){}

	canActivate(route: ActivatedRouteSnapshot, 
		state: RouterStateSnapshot): Observable<boolean> | boolean{

		return this.adminAuthService.isAuthenticated().first();	
	}


}