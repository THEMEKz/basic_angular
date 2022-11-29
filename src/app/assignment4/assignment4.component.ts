import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment4',
  templateUrl: './assignment4.component.html',
  styleUrls: ['./assignment4.component.css']
})
export class Assignment4Component implements OnInit {
  font_num:string =''
  sym:string = ''
  tmp:number = 0

  Isresult:number = 0
  
  constructor() { }

  ngOnInit(): void {
  }

  isClear(){
    this.font_num = ''
    this.sym = ''
    this.tmp = 0
    this.Isresult = 0
  }

  input_num(num:string){
    if(this.font_num == '0'){
      this.font_num = ''
    }
    this.font_num += num
  }

  input_sym(sym:string){
    this.isResultCheck()
    this.fontToCal()
    this.sym = sym
  }

  fontToCal(){
    this.tmp = Number(this.font_num)
    this.font_num = ''
  }

  backSpace(){
    if(this.font_num.length == 0){
      this.sym = ''
    }
    this.font_num = this.font_num.slice(0, -1);
  }

  isResult(){
    if(this.sym == '+'){
      this.Isresult = this.tmp + Number(this.font_num)
    }
    if(this.sym == '-'){
      this.Isresult = this.tmp - Number(this.font_num)
    }
    if(this.sym == '*'){
      this.Isresult = this.tmp * Number(this.font_num)
    }
    if(this.sym == '/'){
      this.Isresult = this.tmp / Number(this.font_num)
    }

    if(this.sym==''){
      this.font_num = String(this.tmp)
    }else{
    this.sym = ''
    this.tmp = 0
    this.font_num = String(this.Isresult)
    }
  }


  isResultCheck(){
    if(this.sym.length > 0){
      this.isResult()
    }
  }

}
