import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MdSidenav, MdDialog, MdDialogConfig } from '@angular/material';
import { AdminAuthService } from '../services/adminAuthService';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  jobseeker_id:number;
  
 

  constructor(private adminAuthService: AdminAuthService,
              private router: Router,
              private http: Http,
              private cookie: CookieService) {}

  ngOnInit(){

    

    const token = this.cookie.get('hhHddsDRTgCEES2334D444D');
    var authHeader = new Headers();
    if(token){
      authHeader.append('Authorization', 'Bearer ' + token);
    }
    
    this.http.get('http://localhost:3000/admin/workforce/123', {headers: authHeader})
        .retry(3)
        .map(response => response.json())  
        .subscribe(
          jobseeker => {
            //console.log(jobseeker.jobseeker[0].age);
            this.jobseeker_id = jobseeker.jobseeker[0].jobseeker_id;
          },
          err => console.log('ERROR GET')
         
        )

  	
  }

  onLogout(){
  	console.log('logout');
  	this.adminAuthService.logout();
  	this.router.navigate(['/admin/login']);

  }
  @ViewChild('sidenav') sidenav: MdSidenav; 


  openSideNav(){
    this.sidenav.open();
  }

  addCampaign(){

    this.router.navigate(['add-campaign']);
  }
  viewCampaigns(){
    console.log('view-campaign');
    this.router.navigate(['view-campaigns']);
  }
  applicants(){
    this.router.navigate(['applicants']);
  }
  setIndex(){
      return 2;
    } 

  getIndex(index){
    console.log(index);
  }


}
