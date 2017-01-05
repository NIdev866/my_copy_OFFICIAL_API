import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

export class ClientComponent implements OnInit{

  constructor(private login:LoginService) { }


  ngOnInit()
  {
  	
  }

  logout()
  {
    this.login.Logout();

  }

}
