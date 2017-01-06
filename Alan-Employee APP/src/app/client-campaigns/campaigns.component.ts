import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { CampaignService } from '../services/campaign.service';
import { MaterializeAction } from 'angular2-materialize';
import { Angular2Apollo } from 'angular2-apollo';
import gql from 'graphql-tag';

const query = gql`
  {
    sectors{
      sector_title,
      jobtitles{
        job_title,
        job_description,
        campaigns{
          campaign_name,
          campaign_id,
          client{
            company_id,
             company_name
             
           },
          jobseekers{
            jobseeker_id,
            first_name,
            last_name,
            email_id,
            reviews{
              review_id,
              jobseeker_id,
              review_content
            }
          }
          
        }
        
        }
    }
  }
`;

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

  constructor(private campaigns: CampaignService, private apollo: Angular2Apollo) { }
  public campaignsList = [];
  public subscription;
  public campaignDelete
  public sectorData;
  selected = [];

  _addCampaign = new EventEmitter<string|MaterializeAction>();
  addCampaign() {
    this._addCampaign.emit({action:"modal",params:['open']});
  }

  _viewCampaign = new EventEmitter<string|MaterializeAction>();
  viewCampaign(id) {
    let _getCampaign = this.campaigns.getCampaignById(id).subscribe();
    setTimeout(() => {
        this._viewCampaign.emit({action:"modal",params:['open']});
      }, 100);
    
  }
  
  ngOnInit()
  {
  	this.apollo.watchQuery({
      query: query
    }).subscribe(({data}) => {
      this.sectorData = data.sectors;
    });
    setTimeout(() => {
      console.log(this.sectorData[0].jobtitles[0].campaigns[1].jobseekers);
    }, 400)
    
  }
  
  deleteCampaign(id)
  {
  	this.campaignDelete = this.campaigns.removeCampaign(id).subscribe(
  		error => console.log("ERR: "+error)
  		);
  	
  }

  removeHandler(id)
  {
    var index = this.selected.indexOf(id);
    if(index > -1)
    {
      this.selected.splice(index,1);
      console.log("Removed: "+id)
    }
    else
    {
      this.selected.push(id);
      console.log("Adding: "+id);
    }
      
  }

  deleteFromDB()
  {
    for(let v of this.selected)
    {
      this.deleteCampaign(v);
      console.log("Deleted: "+v)
    }
  }


}
