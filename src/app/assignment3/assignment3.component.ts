import { Component, OnInit ,Input} from '@angular/core';
import { HoraService } from '../services/hora.service';

@Component({
  selector: 'app-assignment3',
  templateUrl: './assignment3.component.html',
  styleUrls: ['./assignment3.component.css']
})
export class Assignment3Component implements OnInit {
  @Input() name:string = ''
  imgPath:string="assets/hora/0s.png"
  score:number = 0
  
  constructor(public horaservices: HoraService) { }

  ngOnInit(): void {
  }

  cngImgPath(i:number){
    if(i==1){
      this.imgPath = "assets/hora/1s.png"
    }
    else if(i==2){
      this.imgPath = "assets/hora/2s.png"
    }
    else if(i==3){
      this.imgPath = "assets/hora/3s.png"
    }
    else if(i==4){
      this.imgPath = "assets/hora/4s.png"
    }
    else if(i==5){
      this.imgPath = "assets/hora/5s.png"
    }
    else{
      this.imgPath = "assets/hora/0s.png"
    }
  }

  servicesM(){
    this.score = this.horaservices.stringToNum_2(this.name)
    this.cngImgPath(this.score)
  }

  

  
  

  


}
