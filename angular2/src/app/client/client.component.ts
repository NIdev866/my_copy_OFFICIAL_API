import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobseekerService } from '../services/jobseekerService';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})


export class ClientComponent implements OnInit, OnDestroy {

  constructor(private jobseekerService: JobseekerService) { }

  private subscription: Subscription;
  jobseekers = [];


  ngOnInit():any {
  	this.subscription = this.jobseekerService.getJobseekers().subscribe(
  			jobseekers => this.jobseekers = jobseekers, 
  			err => console.log('Error loading server data: ' + err)
  		)

  }

  ngOnDestroy(){
  	this.subscription.unsubscribe();
  }

}
