import { Component, OnInit } from '@angular/core';
import { JobseekerService } from'../jobseeker.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { MaterializeModule } from 'angular2-materialize';
import { JobseekerSelectionService } from '../jobseeker-selection.service';

@Component({
  selector: 'app-jobseeker-list',
  templateUrl: './jobseeker-list.component.html',
  styleUrls: ['./jobseeker-list.component.css']
})
export class JobseekerListComponent implements OnInit {

  constructor(private JobseekerService: JobseekerService, private route: ActivatedRoute, private selection: JobseekerSelectionService)  {
	  	
	}


	jobseekers = [];
	currentJobseeker = {};
	groupName: string;
	testSeekers = this.JobseekerService.getJobseekers()

	private sub_route: Subscription;
	private subscription;

  	ngOnInit(){
		this.subscription = this.JobseekerService.getJobseekers().subscribe(jobseekers => this.jobseekers = jobseekers, err => { console.log("Error: " + err);});
  		this.sub_route = this.route.params.subscribe(
  			(params: any) => {
  				this.groupName = params['name'];
  			}
  		);
  	}

  	ngOnDestroy()
  	{
  		this.subscription.unsubscribe();
  		this.sub_route.unsubscribe();
  	}

  	showJobseeker(jobseeker)
  	{
  		this.currentJobseeker = jobseeker;
      console.log("Name: " + jobseeker.first_name + "ID: " + jobseeker.id)
  	}

  	getJobseeker(id:number)
  	{
  		for (var i = this.jobseekers.length - 1; i >= 0; i--) {
  			if(this.jobseekers[i].id == id)
  			{
  				return this.jobseekers[i];
  			}
  		}
  	}
    


}
