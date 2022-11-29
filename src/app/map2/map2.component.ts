import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapbufferService } from '../services/mapbuffer.service';
@Component({
  selector: 'app-map2',
  templateUrl: './map2.component.html',
  styleUrls: ['./map2.component.css']
})
export class Map2Component implements OnInit {
  @ViewChild("divMap") divMap! : ElementRef
  constructor(private mapbufferService:MapbufferService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.mapbufferService.initalMap(this.divMap)
  }

}
