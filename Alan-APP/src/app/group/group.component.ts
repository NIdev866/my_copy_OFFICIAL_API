import { Component, Input } from '@angular/core';



@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent {

   constructor() { }

  groups = [{name: 'Forklift'},{name: 'Builder'},{name: 'Stock Supplier'},{name: 'Random Group'}];
  selectedGroup: string;
  ngOnInit() {
  }

  showBar: boolean = false;

  showGroup(group)
  {
  	this.selectedGroup = group.name;
  	this.showBar = true;
  }

  
  
}
