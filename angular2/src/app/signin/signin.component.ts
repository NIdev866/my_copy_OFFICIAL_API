import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service';
//import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit ,OnDestroy {

   title = 'LOG IN TO YOUR APP';
   myForm: FormGroup;
    error = false;
    errorMessage = '';

    

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}
      
    ngOnInit():any {
       
        

         this.myForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
     }


    
    isAuth(){
      return false;
    }


    onSignin() {
      this.authService.signinUser(this.myForm.value);


      //TOKEN BASED AUTH
     /* const user = new User(this.myForm.value.email, this.myForm.value.password);
      this.authService.signin(user).subscribe(
          data =>{
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('user_id', data.user_id);
            this.router.navigate(['worker']);
          },
          error => console.log(error);
        );*/
     
       
    }
    
    onLogout(){
      this.authService.logout();
    }



    ngOnDestroy(){
      //this.subscription.unsubscribe();
    }
}
