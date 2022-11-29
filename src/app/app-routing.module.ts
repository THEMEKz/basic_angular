import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Assignment1Component } from './assignment1/assignment1.component';
import { Assignment3Component } from './assignment3/assignment3.component';
import { Assignment4Component } from './assignment4/assignment4.component';
import { Assignment2Component } from './assignment2/assignment2.component';
import { Map1Component } from './map1/map1.component';
import { Map2Component } from './map2/map2.component';
import { Map3Component } from './map3/map3.component';
import { ResponsivecssComponent } from './responsivecss/responsivecss.component';

const routes: Routes = [
  {path : 'assignment1',component:Assignment1Component},
  {path : 'assignment2',component:Assignment2Component},
  {path : 'assignment3',component:Assignment3Component},
  {path : 'assignment4',component:Assignment4Component},
  {path : 'map1',component:Map1Component},
  {path : 'map2',component:Map2Component},
  {path : 'map3',component:Map3Component},
  {path : 'rescss',component:ResponsivecssComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
