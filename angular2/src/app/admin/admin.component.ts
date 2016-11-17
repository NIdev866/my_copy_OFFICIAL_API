import { Component,OnInit,OnDestroy } from '@angular/core';
import { AdminAuthService } from '../services/adminAuthService';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private subscription: Subscription;
  

  constructor(private adminAuthService: AdminAuthService, 
             private router: Router, 
             private cookie: CookieService) {}


  ngOnInit() {
    const token = this.cookie.get('hhHddsDRTgCEES2334D444D');
    console.log(token);
    if(token){
      this.subscription = this.adminAuthService.isAuthenticated().subscribe(
          authStatus =>  {
             this.isAuthenticated = authStatus;//THIS MAKES TRUE OR FALSE
             this.isAuthenticated ? this.router.navigate(['/admin/dashboard']) 
                                  : this.router.navigate(['/admin/login']);

            }
          
        );
    }else{
      this.router.navigate(['/admin/login']);
    }
    
      
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }
}








  


