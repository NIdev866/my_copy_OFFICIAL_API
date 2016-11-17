import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private subscription: Subscription;
  private token: string;

  constructor(private authService: AuthService, 
             private router: Router, 
             private cookie: CookieService) {}


  ngOnInit() {


    if(this.cookie.get('hhHddsDRTgCEES2334D444D') !== null){
      this.token = this.cookie.get('hhHddsDRTgCEES2334D444D');
      console.log(this.token);
    }else{
      this.router.navigate(['/myprofile/login']);
    }
    
    if(this.token !== null){
      this.subscription = this.authService.isAuthenticated().subscribe(
          authStatus =>  {
             this.isAuthenticated = authStatus;//THIS MAKES TRUE OR FALSE
             this.isAuthenticated ? this.router.navigate(['/myprofile/dashboard']) 
                                  : this.router.navigate(['/myprofile/login']);

            }
          
        );
    }else{
      this.router.navigate(['/myprofile/login']);
    }
  	
      
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }

}
