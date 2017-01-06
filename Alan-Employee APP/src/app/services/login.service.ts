import { Injectable } from '@angular/core';
import { CanActivate, Route, Router } from '@angular/router';

@Injectable()
export class LoginService implements CanActivate{

  constructor(private router: Router) { }

  loggedIn = false;
  public person;

  canActivate()
  {
  	if(this.person == null)
  	{
      this.router.navigate(['/']);
  		return false;	
  	}
  	else
  	{ 
  		return true;

    }
  	
  }

  Logout()
  {
    this.person = null;
    this.router.navigate(['/']);
  }

}
