import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-worker-dashboard',
  templateUrl: './worker-dashboard.component.html',
  styleUrls: ['./worker-dashboard.component.css']
})
export class WorkerDashboardComponent implements OnInit {

  jobseeker_id:number;
  
 

  constructor(private authService: AuthService,
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
  	console.log('logout')
  	this.authService.logout();
  	this.router.navigate(['/myprofile/login'])

  }


}
