import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map1',
  templateUrl: './map1.component.html',
  styleUrls: ['./map1.component.css']
})
export class Map1Component implements OnInit {
  @ViewChild("divMap") divMap!: ElementRef

  state_name:string[]=[]
  sub_region:string[]=[]

  data: {state_name:string , sub_region:string ,state_abbr:string}[] = []
  // data!: {state_name:string[], sub_region:string[]}
   
  constructor(private mapService:MapService) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(){
    this.mapService.initalMap(this.divMap)

    this.mapService.queryAllState().then((response)=>{
      console.log("response from QueryAll(): ",response)
        for(let i = 0; i < response.features.length; i++){
          // this.data.state_name.push(response.features[i].attributes.state_name)
          // this.data.sub_region.push(response.features[i].attributes.sub_region)

          const tmp = {
            state_name: response.features[i].attributes.state_name,
            sub_region: response.features[i].attributes.sub_region,
            state_abbr: response.features[i].attributes.state_abbr,
          };
          this.data.push(tmp)

          this.state_name.push(response.features[i].attributes.state_name)
          this.sub_region.push(response.features[i].attributes.sub_region)

          // console.log('state_name : ',a)
        }
      })

    // console.log('state_name : ',this.state_name)
    // console.log('sub_region : ',this.sub_region)

    // console.log('--- data --- : ',this.data.state_name[1])
    console.log('data state_name : ',this.data)
  }


  doStateClick(stateName: string){
    this.mapService.queryStateByStateName(stateName).then((response)=>{
      console.log("queryStateByStateName response", response)
      if(response.features.length > 0){
        let feature = response.features[0]

        this.mapService.addPolygonToGraphicLayer(feature.geometry)
      }
    })
  }

}
