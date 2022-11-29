import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my first angular app';
  items!: MenuItem[];

  ngOnInit() {
    this.items = [
        {label: 'Home', icon: 'pi pi-fw pi-home'},
        {label: 'Comment', icon: 'pi pi-fw pi-comment',routerLink:'/assignment1'},
        {label: 'Hora', icon: 'pi pi-fw pi-star',routerLink:'/assignment3'},
        {label: 'Calculator', icon: 'pi pi-fw pi-calculator',routerLink:'/assignment4'},
        {label: 'Go to', icon: 'pi pi-fw pi-map-marker',routerLink:'/assignment2'},
        {label: 'Map', icon: 'pi pi-fw pi-map',routerLink:'/map1'},
        {label: 'Do buffer', icon: 'pi pi-fw pi-map',routerLink:'/map2'},
        {label: 'Map3', icon: 'pi pi-fw pi-map',routerLink:'/map3'},
        {label: 'CSS', icon: 'pi pi-fw pi-map',routerLink:'/rescss'}
    ];
}
}
