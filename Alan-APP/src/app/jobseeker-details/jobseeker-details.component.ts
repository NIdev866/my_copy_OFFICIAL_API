import { Component, OnInit ,Input, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JobseekerListComponent } from '../jobseeker-list/jobseeker-list.component';
import { JobseekerSelectionService } from '../jobseeker-selection.service';
import { Tab } from '../tabs/tab.interface';
import { TabComponent } from '../tabs/tab.component';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-jobseeker-details',
  templateUrl: './jobseeker-details.component.html',
  styleUrls: ['./jobseeker-details.component.css']
})
export class JobseekerDetailsComponent implements OnInit, AfterViewChecked {

  constructor(private route: ActivatedRoute, private jobseekerList: JobseekerListComponent, private selection: JobseekerSelectionService) { }
	private subscription: Subscription;
	jobseeker = {};
	currentJobId: number;
	lat: number = 51.678418;
  	lng: number = 7.809007;

  	ngOnInit(){
			
  	}

  	ngAfterViewChecked(){
  		this.subscription =this.route.params.subscribe(
  			(params: any) => {
  				this.currentJobId = params['id'];
  				this.jobseeker = this.jobseekerList.getJobseeker(this.currentJobId);
  			}
  		);
  	}

}
