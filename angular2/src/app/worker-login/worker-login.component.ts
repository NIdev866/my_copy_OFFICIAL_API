import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service';
//import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-worker-login',
  templateUrl: './worker-login.component.html',
  styleUrls: ['./worker-login.component.css']
})
export class WorkerLoginComponent implements OnInit, OnDestroy {

  
   title = 'LOG IN TO YOUR APP';
   myForm: FormGroup;
    error = false;
    errorMessage = '';
    jobseeker_id: string;

    

    constructor(private fb: FormBuilder, 
    	private authService: AuthService, 
    	private router: Router,
    	private activatedRoute: ActivatedRoute,
    	private cookie: CookieService) {



    }
      
    ngOnInit():any {
       
        
    	this.jobseeker_id = this.activatedRoute.snapshot.params['id'];

         this.myForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
     }


    
    isAuth(){
      return false;
    }


    
    onSignin() {
      //this.authService.login(this.jobseeker_id, this.myForm.value);


      //TOKEN BASED AUTH
      //const user = new User(this.myForm.value.email, this.myForm.value.password);
      this.authService.worker_login(this.jobseeker_id, this.myForm.value).subscribe(
          data =>{
            this.cookie.put('hhHddsDRTgCEES2334D444D', data.token);
            this.cookie.put('id', data.id);
            /* TO DO ==========https only */
           // Cookie.set('token', data.token, 10, '/myapp/', 'www.bitrec.co.uk', true  );
 


            //localStorage.setItem('user_id', data.user_id);
            this.router.navigate(['/myprofile/dashboard']);
          },
          error => {console.log(error)}
        );
     
       
    }
    
    onLogout(){
      this.authService.logout();
      this.cookie.removeAll();
    }



    ngOnDestroy(){
      //this.subscription.unsubscribe();
    }


}
