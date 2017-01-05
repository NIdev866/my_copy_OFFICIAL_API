import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../services/campaign.service';

@Component({
  selector: 'app-campaigns-view',
  templateUrl: './campaigns-view.component.html',
  styleUrls: ['./campaigns-view.component.css']
})
export class CampaignsViewComponent implements OnInit {

  constructor(private campaigns: CampaignService) { }

  ngOnInit() {
  }

}
