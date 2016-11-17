import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Rx";

//http://localhost:4200/myprofile/createpassword?id=126&email=patrykties%40gmail.com

@Component({
  selector: 'app-worker-password',
  templateUrl: './worker-password.component.html',
  styleUrls: ['./worker-password.component.css']
})
export class WorkerPasswordComponent implements OnInit, OnDestroy {

	private subscription: Subscription;
 
  	param_id: string;
  	param_email: string;

	title = 'CREATE PASSWORD'

   myForm: FormGroup;
    error = false;
    errorMessage = '';

    constructor(private fb: FormBuilder, private authService: AuthService, 
    	private current_route: ActivatedRoute, private router: Router) {
    	this.subscription = current_route.queryParams.subscribe(
	      (queryParam: any) => {
	      	this.param_id = queryParam['id']
	        this.param_email = queryParam['email']

	      }
	    );
    }

   

    ngOnInit(): any {
        this.myForm = this.fb.group({
            email: [this.param_email, Validators.compose([
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
    	this.subscription.unsubscribe();
  	}

  	onSignup() {
        //this.authService.signupUser(this.myForm.value);
        /*let id_obj = {jobseeker_id : this.param_id}
        console.log(this.myForm.value.email);
        let formbody = Object.assign(this.myForm.value,  id_obj);*/

        let formbody = {email: this.myForm.value.email, 
        				password: this.myForm.value.password,
        				jobseeker_id: this.param_id
        				}
        this.authService.add_password(formbody).subscribe(
        	response => {this.router.navigate(['/myprofile/login', this.param_id])},
        	err => {console.log(err)}
        );
        //console.log(formbody);
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
