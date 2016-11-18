import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  template: `
    <sebm-google-map [latitude]="lat" [longitude]="lng">
      <sebm-google-map-marker [latitude]="lat" [longitude]="lng"></sebm-google-map-marker>
    </sebm-google-map>
  `,
  styles: []
})
export class MapComponent implements OnInit {

  constructor() { }
  lat: number = 51.678418;
  lng: number = 7.809007;
  ngOnInit() {
  }

}
