import { Component, Output } from '@angular/core';
import { ClientService } from '../services/client.service';
import { PeopleService } from '../services/people.service';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent{

  constructor(private router: Router, private client: ClientService, private people:PeopleService, private snackBar: MdSnackBar, private loginService: LoginService) { }
  
  person;

  login(type, id)
  {
  	let loginSub;
  	if(type=="user")
  	{
  		loginSub = this.people.findPerson(id).subscribe(
  			data => { this.person = data},
  			err => console.log("ER: "+err)
  			);
  		setTimeout(() => {
  			if(this.person!= null)
  			{
		  		if(this.person.id == id )
		  		{
		  			let category = this.person.category;
            this.loginService.person = this.person;
		  			this.router.navigate(['/', category]);
		  		}
		  		else{
		  			this.snackBar.open('Failed to login', 'Okay')
		  		}
		  	}
		  	else
		  	{
		  		this.snackBar.open('Failed to login', 'Okay')
		  	}
  		}, 500);
  	}
  	else if(type=="client")
  	{
  		loginSub = this.client.findClient(id).subscribe(
  			data => { this.person = data},
  			err => console.log("ER: "+err)
  			);
  		setTimeout(() => {
  			if(this.person!= null)
  			{
		  		if(this.person.id == id)
		  		{
            this.loginService.person = this.person;
		  			this.router.navigate(['/client']);
		  		}
		  		else{
		  			this.snackBar.open('Failed to login', 'Okay')
		  		}
		  	}
		  	else
		  	{
		  		this.snackBar.open('Failed to login', 'Okay')
		  	}
  		}, 500);
  	}
  }
  
}
