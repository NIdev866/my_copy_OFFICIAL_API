import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../services/people.service';

@Component({
  selector: 'app-view-person',
  templateUrl: './view-person.component.html',
  styleUrls: ['./view-person.component.css']
})
export class ViewPersonComponent implements OnInit {

  constructor(private people: PeopleService) { }

  ngOnInit() {
  }

}
