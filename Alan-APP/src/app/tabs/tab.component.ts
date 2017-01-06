import { Component, Input, OnInit } from '@angular/core';
import { Tab } from './tab.interface';
import { TabsComponent } from './tabs.component';

@Component({
  selector: 'app-tab',
  template: `
    <div [hidden]="!selected">
      <ng-content></ng-content>
    </div>

  `,
  styles: []
})
export class TabComponent implements OnInit, Tab {

  @Input() tabTitle;
  
  constructor(private tabsComponent: TabsComponent) {}
  
  selected:boolean = false;

  ngOnInit() {
    this.tabsComponent.addTab(this);
  }
}
