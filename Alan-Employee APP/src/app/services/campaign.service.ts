import { Injectable } from '@angular/core';
import {Http } from '@angular/http';
import { header } from '../header';

@Injectable()
export class CampaignService {

  constructor(private http: Http) { }

  public wantedCampaign ={};
  public campaignsByCreatedId = [];
  
  private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
  }

  getCampaign() {
    return this.http.get('http://localhost:3000/campaigns')
      .map(res => res.json())
      .catch(er => this.handleError(er));
  }

  getRecruitmentList() {
    return this.http.get('http://localhost:3000/appliedFor')
      .map(res => res.json())
      .catch(er => this.handleError(er));
  }

  getCampaignById(id) {
    return this.http.get('http://localhost:3000/campaigns/'+id)
      .map(res => this.wantedCampaign = res.json())
      .catch(er => this.handleError(er));
  }

  getCampaignByCreatorId(id){
    return this.http.get('http://localhost:3000/campaigns?createdById=' + id)
      .map(res => this.campaignsByCreatedId = res.json())
      .catch(er => this.handleError(er));
  }

  addCampaign(data)
  {
  	let body = JSON.stringify(data);
  	return this.http.post('http://localhost:3000/campaigns', body, {headers: header})
  		.map(res => console.log(res))
  		.catch(er => this.handleError(er));
  }

  updateCampaign(data)
  {
  	let id = data.id;
  	let body = JSON.stringify(data);
  	return this.http.put('http://localhost:3000/campaigns/'+ id, body, {headers: header})
  		.map(res => console.log(res))
  		.catch(er => this.handleError(er));
  }

  removeCampaign(id)
  {
  	return this.http.delete('http://localhost:3000/campaigns/' + id)
    .map(res => console.log(res))
    .catch(er => this.handleError(er));
  }

  applyForCampaign(data)
  {
    let body = JSON.stringify(data);
    return this.http.post('http://localhost:3000/appliedFor', body, {headers: header})
      .map(res => console.log(res))
      .catch(er => this.handleError(er));
  }
}
