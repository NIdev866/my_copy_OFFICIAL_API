
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Rx';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';




@Injectable()
export class JobseekerService {

	constructor(private http: Http){}

	getJobseekers(){
		return this.http.get('https://www.bitrec.co.uk/api/nestedjobseekers')
			   .map(response => response.json())
			   .catch((error:any)=> Observable.throw(error.json().error || 'Server Error'));
	}
	
	



}