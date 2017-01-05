import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { CampaignService } from '../services/campaign.service';
import { LoginService } from '../services/login.service';
import { MaterializeAction } from 'angular2-materialize';
import { Submission } from './submission';

@Component({
  selector: 'app-jobseeker-campaigns',
  templateUrl: './jobseeker-campaigns.component.html',
  styleUrls: ['./jobseeker-campaigns.component.css']
})
export class JobseekerCampaignsComponent implements OnInit {

  constructor(private campaigns: CampaignService, private login: LoginService) { }
  
  public campaignsList = [];
  public subscription;
  public campaignDelete;
  selected = 0;
  

  _viewCampaign = new EventEmitter<string|MaterializeAction>();
  viewCampaign(id) {
    let _getCampaign = this.campaigns.getCampaignById(id).subscribe(
      data => this.selected = data.id
    );
    setTimeout(() => {
        this._viewCampaign.emit({action:"modal",params:['open']});
        
      }, 100);
    //this.selected.id 
  }
    

  apply()
  {
    let body_data = "{ \"campaign_id\": "+this.selected+", \"jobseeker_id\": " + this.login.person.id + "}";
    let body = JSON.parse(body_data);
    let apply = this.campaigns.applyForCampaign(body).subscribe();
    console.log(body);
  }
  
  ngOnInit()
  {
  	this.subscription = this.campaigns.getCampaign().subscribe(
  		data => { this.campaignsList = data},
  		error => console.log("ER: "+error)
  		);

  }
  
}
