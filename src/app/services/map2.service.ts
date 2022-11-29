import { Injectable ,ElementRef} from '@angular/core';

import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Basemap from "@arcgis/core/Basemap";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import Widget from "@arcgis/core/widgets/Widget";

import LayerList from "@arcgis/core/widgets/LayerList";

@Injectable({
  providedIn: 'root'
})
export class Map2Service {
  map!: Map
  mapView!: MapView
  featureLayer!: MapImageLayer
  constructor() { }

  initalMap(dom: ElementRef){
    // Map
    let basemap = new Basemap({
      baseLayers: [
        new MapImageLayer({
          url: "https://services.arcgisonline.com/arcgis/rest/services/Ocean_Basemap/MapServer",
          title: "Basemap"
        })
      ],
      title: "basemap",
      id: "basemap"
    });
    
    this.map = new Map({
      basemap: basemap
    });

    // View Map
    this.mapView = new MapView({
      map: this.map,
      container : dom.nativeElement,
      center:[-90,30],
      zoom:20
    })

    this.featureLayer = new MapImageLayer({
      url:"https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer"
    })

    this.map.add(this.featureLayer)

    this.mapView.when(()=>{
      this.initalLayerList()
 
      
      

    })
  }

  initalLayerList(){
    let layerList = new LayerList({
      view: this.mapView
    });

    this.mapView.ui.add(layerList, {
      position: "top-right"
    });
  }


}
