import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jobseeker-start',
  template: `
    <div class="col l8">
      <h1>Please select a person!</h1>
    </div>
  `,
  styles: []
})
export class JobseekerListStartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
