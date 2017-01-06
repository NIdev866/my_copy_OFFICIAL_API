import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-jobseeker',
  templateUrl: './jobseeker.component.html',
  styleUrls: ['./jobseeker.component.css']
})

export class JobseekerComponent implements OnInit{

  constructor(private login:LoginService) { }


  ngOnInit()
  {
  	
  }

  logout()
  {
    this.login.Logout();

  }

}
