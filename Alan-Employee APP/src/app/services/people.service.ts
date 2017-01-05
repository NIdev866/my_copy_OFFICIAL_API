import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { header } from '../header';

@Injectable()
export class PeopleService {

  constructor(private http: Http) { }
  public person;

  private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
  }

  getPeople() {
  	return this.http.get('http://localhost:3000/people')
  		.map(res => res.json())
  		.catch(er => this.handleError(er));
  }

  addPerson(data)
  {
  	let body = JSON.stringify(data);
  	return this.http.post('http://localhost:3000/people', body, {headers: header})
  		.map((res: Response) => console.log(res))
  		.catch(er => this.handleError(er));
  }

  updatePerson(data)
  {
  	let id = data.id;
  	let body = JSON.stringify(data);
  	return this.http.put('http://localhost:3000/people/'+ id, body, {headers: header})
  		.map(res => console.log(res))
  		.catch(er => this.handleError(er));
  }

  removePerson(id)
  {
  	return this.http.delete('http://localhost:3000/people/' + id)
  		.catch(er => this.handleError(er));
  }

  findPerson(id)
  {
  	return this.http.get('http://localhost:3000/people/'+id)
      .map(res => this.person = res.json())
  		.catch(er => this.handleError(er));
  }

}
