import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
 
})

//THIS WORKS LIKE A CONTROLLER WHERE $scope = this.xxxx.xxx or just title='string'
export class AppComponent implements OnInit, OnDestroy{

	isAuthenticated = false;
    private subscription: Subscription;

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit():any {
	/*this.subscription = this.authService.isAuthenticated().subscribe(
          authStatus =>  {
             this.isAuthenticated = authStatus//THIS MAKES TRUE OR FALSE
             //authStatus ? this.router.navigate(['admin']) : this.router.navigate(['signin']);

	            /*if(this.isAuthenticated){
	            	this.router.navigate(['admin']);
	            }else{
	            	this.router.navigate(['signin']);
	            }
            }
          
        );*/
	}

	ngOnDestroy(){
      this.subscription.unsubscribe();
    }


    //TOKEN BASED AUTH
    isUserLoggedIn(){
    	return this.authService.isUserLoggedIn();
    }
 

}
