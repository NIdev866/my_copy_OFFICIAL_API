import { Component, OnInit, EventEmitter } from '@angular/core';
import { LoginService } from '../services/login.service';
import { PeopleService } from '../services/people.service';
import { FormBuilder } from '@angular/forms';
import { CampaignService } from '../services/campaign.service';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-worker-dashboard',
  templateUrl: './worker-dashboard.component.html',
  styleUrls: ['./worker-dashboard.component.css']
})
export class WorkerDashboardComponent implements OnInit {

  constructor(private login: LoginService, private people: PeopleService, private campaigns: CampaignService, private formBuilder: FormBuilder) 
  { 
  	this.form.valueChanges.subscribe(
  		data => this.isChanged = true
  		) 
  }
  
  isChanged: boolean;

 form = this.formBuilder.group ({
    id: this.login.person.id,
    first_name: this.login.person.first_name,
    last_name: this.login.person.last_name,
    date_of_birth: this.login.person.date_of_birth,
    gender: this.login.person.gender,
    email: this.login.person.email,
    pic_url: this.login.person.pic_url,
    street_adress: this.login.person.street_adress,
    city: this.login.person.city,
    country: this.login.person.country
  })

  saveChanges(data)
  {
  	let updatePerson = this.people.updatePerson(data).subscribe();
  }

  ngOnInit() {
    this.isChanged = false;
  	
  }

}
