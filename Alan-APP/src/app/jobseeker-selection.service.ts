import { Injectable } from '@angular/core';

@Injectable()
export class JobseekerSelectionService {

  constructor() { }

  jobseekers = [];

  addJobseeker(jobseeker)
  {
  	this.jobseekers.push(jobseeker);
  	console.log(jobseeker.first_name + " " + jobseeker.last_name + " have been added!");
  }

  removeJobseeker(jobseeker)
  {
  	let index = this.jobseekers.indexOf(jobseeker);
  	this.jobseekers.splice(index,1);
  	console.log(jobseeker.first_name + " " + jobseeker.last_name + " have been removed!");
  }

  selectionHandler(jobseeker)
  {
  	let selectedOne;
  	for(let person of this.jobseekers)
  	{
  		if(jobseeker === person)
  		{
  			selectedOne = jobseeker;
  		}

  	}

  	if(selectedOne != null)
  	{
  		this.removeJobseeker(jobseeker);
  		jobseeker.selected = false;
  	}
  	else
  	{
  		this.addJobseeker(jobseeker);
  		jobseeker.selected = true;
  	}
  }

  showSelectedJobseekers()
  {
  	console.log(this.jobseekers);
  }
}
