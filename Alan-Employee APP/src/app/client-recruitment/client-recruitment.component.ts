import { Component, OnInit, EventEmitter } from '@angular/core';
import { CampaignService } from '../services/campaign.service';
import { PeopleService } from '../services/people.service';
import { MaterializeAction } from 'angular2-materialize';


@Component({
  selector: 'app-client-recruitment',
  templateUrl: './client-recruitment.component.html',
  styleUrls: ['./client-recruitment.component.css']
})
export class ClientRecruitmentComponent implements OnInit {

  constructor(private campaign: CampaignService, private people: PeopleService) { }
  public recruitmentList;
  public viewPerson;

  ngOnInit() {
  	let sub = this.campaign.getRecruitmentList().subscribe(
  		data => this.recruitmentList = data 
  	);
  	
  }

  _viewPerson = new EventEmitter<string|MaterializeAction>();
  showPerson(id) {
    let _getPerson = this.people.findPerson(id).subscribe();
    setTimeout(() => {
        this._viewPerson.emit({action:"modal",params:['open']});
      }, 100);
    
  }
}
