import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'group-start',
  template: `
    <div class="col l8">
      <h1>Please select a group!</h1>
    </div>
  `,
  styles: []
})
export class GroupStartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
