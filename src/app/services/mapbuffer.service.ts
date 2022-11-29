import { Injectable, ElementRef } from '@angular/core';

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Point from "@arcgis/core/geometry/Point";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import Geometry from "@arcgis/core/geometry/Geometry";
import Graphic from "@arcgis/core/Graphic";
import Polygon from "@arcgis/core/geometry/Polygon";

import ClosestFacilityParameters from "@arcgis/core/rest/support/ClosestFacilityParameters";
import * as closestFacility from "@arcgis/core/rest/closestFacility";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';



@Injectable({
  providedIn: 'root'
})
export class MapbufferService {
  map!: Map
  mapView!: MapView
  MapImageLayer!: MapImageLayer
  shopfeatureLayer!:FeatureLayer

  constructor() { }
  
  initalMap(dom: ElementRef) {
    this.map = new Map({
      basemap : "topo-vector"
    })

    this.mapView = new MapView({
      map: this.map,
      container: dom.nativeElement,
      center:[100,13],
      zoom:13
    })

    this.MapImageLayer = new MapImageLayer({
      url:"https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer"
    })

    this.shopfeatureLayer = new FeatureLayer({
      url:"https://gisserv1.cdg.co.th/arcgis/rest/services/AtlasX/AtlasX/FeatureServer/0"
    })

    // this.map.add(this.MapImageLayer)
    this.map.add(this.shopfeatureLayer)

    this.mapView.when(()=>{
      this.mapView.on("click",(clickResponse)=>{
        const graphicIncident = this.drawPointToMap(clickResponse.mapPoint)
        this.mapView.graphics.removeAll()

        console.log("onClick clickResponse =" ,clickResponse)
        // this.drawPointToMap(clickResponse.mapPoint)
        this.doBffer(clickResponse.mapPoint,graphicIncident)
        // this.addPoint(clickResponse.mapPoint)
        
        
      })
    })
  }

  addPoint(point: Point){
    this.mapView.goTo({
      center:point
    },{
      duration:1000
    })

    // create symbol
    const symbol = new SimpleMarkerSymbol({
      style: "circle",
      color: "red",
      size: "10px",
      outline: {
        color: [ 255, 255, 255 ],
        width: 1
      }
    })

    // create graphic layer
    const graphic = new Graphic({
      geometry:point,
      symbol:symbol
    })

    this.mapView.graphics.add(graphic)
  }

  doBffer(point: Point,graphicIncident: Graphic){
    const bufferGP = geometryEngine.buffer(point, 500)
    console.log("doBffer bufferGP=",bufferGP)
    this.addPolygonGraphicLayer(bufferGP as Geometry)
    // this.mapView.graphics.add(bufferGP)
    this.spatialQuery(bufferGP as Geometry,graphicIncident)
    this.addPoint(point)
  }

  addPolygonGraphicLayer(polygon: Geometry){
    let symbol2 ={
      type:"simple-fill",
      color:[51,51,204,0.2],
      style:"solid",
      outline:{
        color:[255,255,255],
        width:1
      }
    };
    
    const graphic = new Graphic({
      geometry:polygon,
      symbol:symbol2
    })

    // let polygon2 = polygon as Polygon
    this.mapView.graphics.add(graphic)
  }

  spatialQuery(geometry:Geometry, graphicIncident: Graphic){
    let params =  this.shopfeatureLayer.createQuery()
    params.geometry = geometry
    params.outFields = ["*"]
    params.returnGeometry = true
  
    this.shopfeatureLayer.queryFeatures(params).then((response)=>{
      console.log("shopfeatureLayer : ",response)

      const shopFoundSymbol = {
        type : "simple-merker",
        color : [255,119,255],
        outline: {
          color : [255,255,255],
          width : 2
        }
      }
      
      let gpList = []
      for(let feature of response.features){
        console.log("#feature : ",feature)
        const gp = new Graphic({
          geometry : feature.geometry,
          symbol: shopFoundSymbol
        })
        gpList.push(gp)
      }

      let params = new ClosestFacilityParameters({
        returnIncidents: true,
        returnFacilities : true,
        returnRoutes: true,
        returnDirections: true,
        defaultTargetFacilityCount: 5,
        incidents: new FeatureSet({
          features: [graphicIncident]
        }),
        facilities: new FeatureSet({
          features: response.features
        }),
      })

      closestFacility.solve("https://gisserv1.cdg.co.th/arcgis/rest/services/SI_Network/NAServer/Closest%20Facility",params).then((response)=>{
        console.log("closestFacility : ",response)
        if (response.routes.features.length > 0){
          for(let feature of response.routes.features){
            console.log("feature : ",feature)
            let symbol = {
              type : "simple-line",
              color : [255,102,102],
              width : "2px",
              style : "short-dot"
            }

            const graphicRoute = new Graphic({
              geometry: feature.geometry,
              symbol: symbol
            })
            this.mapView.graphics.add(graphicRoute)
          }
        }
      })
    })
  }

  drawPointToMap(point: Point){
    const symbol = new SimpleMarkerSymbol({
      style:"circle",
      color:"green",
      size:"8px",
      outline:{
        color:[255,255,0],
        width:3
      }
    })
  
    const graphic = new Graphic({
      geometry:point,
      symbol:symbol
    })
    return graphic
  
  }
}
