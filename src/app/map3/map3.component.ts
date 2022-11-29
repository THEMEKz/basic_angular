import { Component, OnInit ,ElementRef,ViewChild} from '@angular/core';
import { Map2Service } from '../services/map2.service';

@Component({
  selector: 'app-map3',
  templateUrl: './map3.component.html',
  styleUrls: ['./map3.component.css']
})
export class Map3Component implements OnInit {
  @ViewChild("divMap") divMap!: ElementRef
  constructor(private map2Service:Map2Service) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.map2Service.initalMap(this.divMap)
  }

}
