import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminAuthService } from '../services/adminAuthService';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit, OnDestroy {

  title = 'LOG IN TO YOUR APP';
   myForm: FormGroup;
    error = false;
    errorMessage = '';
    jobseeker_id: string;

    

    constructor(private fb: FormBuilder, 
    	private adminAuthService: AdminAuthService, 
    	private router: Router,
    	private cookie: CookieService) {



    }
      
    ngOnInit():any {
       
        
    

         this.myForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
     }


    
    isAuth(){
      return false;
    }


    signup(){
    	this.router.navigate(['/admin/createadmin']);
    }

    
    onSignin() {
      //this.authService.login(this.jobseeker_id, this.myForm.value);


      //TOKEN BASED AUTH
      //const user = new User(this.myForm.value.email, this.myForm.value.password);
      this.adminAuthService.login(this.myForm.value).subscribe(
          data =>{
          	
            this.cookie.put('hhHddsDRTgCEES2334D444D', data.token);
            this.cookie.put('id', data.id);
            /* TO DO ==========https only */
           // Cookie.set('token', data.token, 10, '/myapp/', 'www.bitrec.co.uk', true  );
 


            //localStorage.setItem('user_id', data.user_id);
           
            this.router.navigate(['/admin/dashboard']);
            
            
          },
          error => {console.log(error)}
        );
     
       
    }
    
    onLogout(){
      this.adminAuthService.logout();
      this.cookie.removeAll();
    }



    ngOnDestroy(){
      //this.subscription.unsubscribe();
    }

}
