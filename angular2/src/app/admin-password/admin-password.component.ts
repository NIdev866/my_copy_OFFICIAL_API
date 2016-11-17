import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AdminAuthService } from '../services/adminAuthService';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'app-admin-password',
  templateUrl: './admin-password.component.html',
  styleUrls: ['./admin-password.component.css']
})
export class AdminPasswordComponent implements OnInit, OnDestroy {

 	private subscription: Subscription;
 
  	param_id: string;
  	param_email: string;

	title = 'CREATE PASSWORD'

   myForm: FormGroup;
    error = false;
    errorMessage = '';

    constructor(private fb: FormBuilder, private adminAuthService: AdminAuthService, 
    	 private router: Router) {
    	
    }

   

    ngOnInit(): any {
        this.myForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ])],

        });
    }
    ngOnDestroy() {
    	//this.subscription.unsubscribe();
  	}

  	onSignup() {
        //this.authService.signupUser(this.myForm.value);
        /*let id_obj = {jobseeker_id : this.param_id}
        console.log(this.myForm.value.email);
        let formbody = Object.assign(this.myForm.value,  id_obj);*/

        let admin_data = {email: this.myForm.value.email, 
        				password: this.myForm.value.password
        				
        				}
        this.adminAuthService.create_admin(admin_data).subscribe(
        	response => {
        		if(response){
        			this.router.navigate(['/admin/login'])
        		}
        	},
        	err => {console.log(err)}
        );
        
    }

    isEmail(control: FormControl): {[s: string]: boolean} {
        if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            return {noEmail: true};
        }
    }

    isEqualPassword(control: FormControl): {[s: string]: boolean} {
        if (!this.myForm) {
            return {passwordsNotMatch: true};

        }
        if (control.value !== this.myForm.controls['password'].value) {
            return {passwordsNotMatch: true};
        }
    }



}
