import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HoraService {
  score!:number
  constructor() {}



  stringToNum_2(text_2:string){
    this.score = 0
    for(let i = 0; i < text_2.length; i++){
      this.score += text_2.charCodeAt(i)
    }

    return this.score%5+1
  }
  
}
