import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class JobseekerService {

  constructor(private http: Http) { }
  
  getJobseekers() {
  	return this.http.get('http://www.json-generator.com/api/json/get/cpAcSAJNlu?indent=2')
  		.map(response => response.json())
  		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
