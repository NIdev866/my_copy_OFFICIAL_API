import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})

export class WorkerComponent implements OnInit{

  constructor(private login:LoginService) { }


  ngOnInit()
  {
  	
  }

  logout()
  {
    this.login.Logout();

  }

}
