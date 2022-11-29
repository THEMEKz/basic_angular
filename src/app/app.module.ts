import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Assignment1Component } from './assignment1/assignment1.component';
import { Assignment3Component } from './assignment3/assignment3.component';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from './assignment1/comment/comment.component';
import { Assignment4Component } from './assignment4/assignment4.component';
import { Assignment2Component } from './assignment2/assignment2.component';

// PrimeNG
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
// import { LocatorComponent } from './assignment2/locator/locator.component';
import {TabMenuModule} from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { Map1Component } from './map1/map1.component';

import {TableModule} from 'primeng/table';
import { Map2Component } from './map2/map2.component';
import { Map3Component } from './map3/map3.component';
import { ResponsivecssComponent } from './responsivecss/responsivecss.component';


@NgModule({
  declarations: [
    AppComponent,
    Assignment1Component,
    Assignment3Component,
    CommentComponent,
    Assignment4Component,
    Assignment2Component,
    Map1Component,
    Map2Component,
    Map3Component,
    ResponsivecssComponent,


    // LocatorComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    TabMenuModule,
    TableModule,
    // MenuItem,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
