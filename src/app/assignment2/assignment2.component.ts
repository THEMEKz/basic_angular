import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-assignment2',
  templateUrl: './assignment2.component.html',
  styleUrls: ['./assignment2.component.css']
})
export class Assignment2Component implements OnInit {
  lat!:string
  long!:string
  position:string = ""

  @ViewChild("divMap") divMap!: ElementRef
  constructor(private mapService:MapService) { }

  ngOnInit(): void {
  }

  fn_locate(){
    this.position = this.lat + ' , ' + this.long
    this.mapService.goTo(Number(this.lat),Number(this.long))
  }

  ngAfterViewInit(){
    this.mapService.initalMap(this.divMap)
  }

}
