import { ElementRef, Injectable } from '@angular/core';

import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import Graphic from "@arcgis/core/Graphic"
import Point from "@arcgis/core/geometry/Point"
// import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import Query from "@arcgis/core/rest/support/Query";

import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import * as identify from "@arcgis/core/rest/identify";
import IdentifyParameters from "@arcgis/core/rest/support/IdentifyParameters";
import LayerList from "@arcgis/core/widgets/LayerList";

import { Observable } from 'rxjs/internal/Observable';
import Polygon from "@arcgis/core/geometry/Polygon";
import Geometry from "@arcgis/core/geometry/Geometry";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";

import Widget from "@arcgis/core/widgets/Widget";
import Editor from "@arcgis/core/widgets/Editor";



@Injectable({
  providedIn: 'root'
})
export class MapService {
  map!: Map
  mapView!: MapView
  featureLayer!: FeatureLayer
  sanDiegoLayer!: FeatureLayer
  state: string[]=[]
  // nameCity=[{
  //   name,
  // }]
  listNameCity:string[] = []
  // data:any
  constructor() { }

  initalMap(dom: ElementRef){
    // Map
    this.map = new Map({
      basemap: "topo-vector"
    })
    // View Map
    this.mapView = new MapView({
      map: this.map,
      container : dom.nativeElement,
      center:[100,13],
      zoom:13
    })

    this.featureLayer = new FeatureLayer({
      url:"https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2"
    })

    this.sanDiegoLayer = new FeatureLayer({
      url:"https://sampleserver6.arcgisonline.com/arcgis/rest/services/EmergencyFacilities/FeatureServer/0"
    })

    this.map.add(this.featureLayer)
    this.map.add(this.sanDiegoLayer)

    this.mapView.when(()=>{
      this.initalEditor()
      // click to show popup
      this.mapView.on("click",(clickResponse)=>{
        this.mapView.hitTest(clickResponse).then((response)=>{
          console.log("response : ",response)

          let params = new IdentifyParameters()
          params.tolerance = 3
          params.layerIds = [2]
          params.geometry = clickResponse.mapPoint
          params.height = this.mapView.height
          params.mapExtent = this.mapView.extent

          identify.identify(this.featureLayer.url,params).then((response)=>{
            console.log("identify respne:",response)

            if(response.results.length>0){
              let feature = response.results[0].feature
              feature.popupTemplate = {
                title:"{state_name}",
                content:"Population : {pop2000}<br> Area: {st_area(shape)}"
              }
              this.mapView.popup.open({
                features:[feature],
                location: clickResponse.mapPoint
              })
            }
          })
        })
      })
      

    })
  }

  initalEditor(){
    const editor = new Editor({
      view: this.mapView
    });
    
    this.mapView.ui.add(editor, "top-right");
  }

  goTo(lat:number,long:number){

    this.mapView.goTo({
      center:[long,lat],
      zoom:16
    },{
      duration:3000
    }
    )
    // removee all pin point
    this.mapView.graphics.removeAll()
    
    // craeta point
    const point = new Point({
      latitude: lat,
      longitude: long
    })

    // create symbol
    const symbol = new SimpleMarkerSymbol({
      style: "square",
      color: "blue",
      size: "8px",
      outline: {
        color: [ 255, 255, 0 ],
        width: 3
      }
    })

    // create graphic layer
    const graphic = new Graphic({
      geometry:point,
      symbol:symbol
    })

    this.mapView.graphics.add(graphic)

  }

  getStateName(){
    return this.listNameCity
  }

  queryAllState() {
    // console.log("from query()")
    let query = this.featureLayer.createQuery();
    query.where = "1=1"
    query.outFields = ["state_name","sub_region","state_abbr"]
    // query.where = "1=1"
    // query.outFields = ["state_name","sub_region","state_abbr"]
    query.returnGeometry = true

    return this.featureLayer.queryFeatures(query)
    
  }

  queryAllStateObs(): Observable<any> {
    let query = this.featureLayer.createQuery();
    query.where = "1=1"
    query.outFields = ["sub_region", "state_name", "state_abbr"]
    query.returnGeometry = false

    const obs = new Observable(observable => {
      this.featureLayer.queryFeatures(query).then((response) => {
        console.log("##### response = ", response)
        //state
        if (response.features.length > 0) {
          for (let feature of response.features) {
            this.state.push(feature.attributes.state_name)
          }
        }
        observable.next(this.state)
        observable.complete();
        // observer.next(this.state)
        // observer.complete();
      })
    });
    return obs
  }

  queryStateByStateName(stateName: string) {
    let query = this.featureLayer.createQuery();
    query.where = "state_name = '" + stateName + "'"
    query.outFields = ["sub_region", "state_name", "state_abbr"]
    query.returnGeometry = true

    return this.featureLayer.queryFeatures(query)
  }


  addPolygonToGraphicLayer(polygon: Geometry){
    let symbol = {
      type:"simple-fill",
      color: [51,51,204,0.9],
      style: "solid",
      outline:{
        color: "white",
        width: 1
      }
    };

    const graphic = new Graphic({
      geometry: polygon,
      symbol: symbol
    })

    let polygon2 = polygon as Polygon
    this.mapView.graphics.removeAll()
    this.mapView.graphics.add(graphic)
    this.mapView.goTo({
      center: [polygon2.centroid.longitude, polygon2.centroid.latitude],
      zoom: 5
    })
  }
  
  

}
 