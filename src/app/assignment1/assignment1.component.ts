import { Component, OnInit } from '@angular/core';
import { HoraService } from '../services/hora.service';

@Component({
  selector: 'app-assignment1',
  templateUrl: './assignment1.component.html',
  styleUrls: ['./assignment1.component.css']
})
export class Assignment1Component implements OnInit {
  comments: string[] = []
  newComment: string = ''
  names: string[] = []
  newName: string = ''
  constructor(public horaservices: HoraService) { }

  ngOnInit(): void {
  }

  addComment(){
    this.names.push(this.newName)
    this.comments.push(this.newComment)
  }
  clearComment(){
    this.newComment = ''
    this.newName = ''
  }

}
