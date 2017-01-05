import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { LoginService } from '../services/login.service';
import { CampaignService } from '../services/campaign.service';
import { Submission } from './submission';



@Component({
  selector: 'app-client-campaigns-add',
  templateUrl: './client-campaigns-add.component.html',
  styleUrls: ['./client-campaigns-add.component.css']
})
export class ClientCampaignsAddComponent implements OnInit, OnDestroy {

  submission: Submission = {
  	title: '',
  	company_name: '',
  	location_town: '',
  	location_postcode: '',
  	job_type: '',
  	salary: '',
  	description: '',
    createdById: this.login.person.id, 
  }

  public campaignCreate;
  constructor(private campaigns: CampaignService, private login: LoginService) { }

  ngOnInit() {
  }

  submitForm(myForm:NgForm) {
     this.createCampaign(myForm.value);
     myForm.reset();
  }

  createCampaign(data)
  {
    this.campaignCreate = this.campaigns.addCampaign(data).subscribe(
      error => console.log("ERR: "+error)
      );
    
  }

  ngOnDestroy()
  {
    //this.campaignCreate.unsubscribe();
  }
}
