import { Component, EventEmitter, Output } from '@angular/core';
import { Tab } from './tab.interface';
import { TabComponent } from './tab.component'

@Component({
  selector: 'app-tabs',
  template: `
    <table class="centered smaller">
        <thead>
          <tr>
            <th data-field="name" *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active-tab]="tab.selected">
              {{tab.tabTitle}}
            </th>
          </tr>
        </thead>
      </table>
    <ng-content></ng-content>
  `,
  styles: [`
    .smaller {
      width: 100%;
      margin-bottom:3px;
    }

    .active-tab { 
      background-color:rgb(200,200,200);
    }

    th:hover {
      background-color:rgb(200,200,200);
    }

    th {
      background-color:rgb(255,255,255);
    }
  `]
})
export class TabsComponent  {

  constructor() { }

   tabs:Tab[] = [];
  @Output() selected = new EventEmitter();
  
  addTab(tab:Tab) {
    if (!this.tabs.length) {
      tab.selected = true;
    }
    this.tabs.push(tab);
  }
  
  selectTab(tab:Tab) {
    this.tabs.map((tab) => {
      tab.selected = false;
    })
    tab.selected = true;
    this.selected.emit({selectedTab: tab});    
  }

}
