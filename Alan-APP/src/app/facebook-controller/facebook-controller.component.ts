import { Component, OnInit } from '@angular/core';
import { FacebookService, FacebookLoginResponse, FacebookInitParams} from 'ng2-facebook-sdk/dist';

@Component({
  selector: 'facebook-controller',
  templateUrl: './facebook-controller.component.html',
  styleUrls: ['./facebook-controller.component.css']
})
export class FacebookControllerComponent {

  constructor(private fb: FacebookService) {
  	let fbParams: FacebookInitParams = {
    	appId: '292658341134264',
        xfbml: true,
        version: 'v2.6'
    };
    this.fb.init(fbParams);
   }
  	
   	userID:number = 0;

  someFunction(): void {
  	this.fb.login().then(
  		(response: FacebookLoginResponse) => console.log(response),
  		(error: any) => console.error(error)
  	);
  }

  loginHandler(resp)
  {
  	if(resp.status =="connected")
  	{
  		this.userID = resp.authResponse.userID;
  	}
  }

}
