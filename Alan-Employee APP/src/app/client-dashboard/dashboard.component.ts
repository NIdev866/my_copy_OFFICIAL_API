import { Component, OnInit, EventEmitter } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ClientService } from '../services/client.service';
import { FormBuilder } from '@angular/forms';
import { CampaignService } from '../services/campaign.service';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private login: LoginService, private client: ClientService, private campaigns: CampaignService, private formBuilder: FormBuilder) 
  { 
  	this.form.valueChanges.subscribe(
  		data => this.isChanged = true
  		) 
  	}
  isChanged = false;

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
  	let updatePerson = this.client.updateClient(data).subscribe();
  }

  ngOnInit() {
  	let getCampaigns = this.campaigns.getCampaignByCreatorId(this.login.person.id).subscribe();
  }

  _viewCampaign = new EventEmitter<string|MaterializeAction>();
  viewCampaign(id) {
    let _getCampaign = this.campaigns.getCampaignById(id).subscribe();
    setTimeout(() => {
        this._viewCampaign.emit({action:"modal",params:['open']});
      }, 100);
    
  }

}
