import { Injectable } from '@angular/core';
import {Http } from '@angular/http';
import { header } from '../header';

@Injectable()
export class ClientService {

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
  }

  getClients() {
  	return this.http.get('http://localhost:3000/clients')
  		.map(res => res.json())
      .catch(er => this.handleError(er));
  }

  addClient(data)
  {
  	let body = JSON.stringify(data);
  	return this.http.post('http://localhost:3000/clients', body, {headers: header})
  		.map(res => console.log(res))
  		.catch(er => this.handleError(er));
  }

  updateClient(data)
  {
  	let id = data.id;
  	let body = JSON.stringify(data);
  	return this.http.put('http://localhost:3000/clients/'+ id, body, {headers: header})
  		.catch(er => this.handleError(er));
  }

  removeClient(id)
  {
  	return this.http.delete('http://localhost:3000/clients/' + id)
    .catch(er => this.handleError(er));
  }

  findClient(id)
  {
    return this.http.get('http://localhost:3000/clients/'+id)
      .map(res => res.json())
      .catch(er => this.handleError(er));
  }}
