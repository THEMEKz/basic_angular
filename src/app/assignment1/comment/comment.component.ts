import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: string = ''
  @Input() name: string = ''
  editComment: string = ''
  editName: string = ''
  isDisplay: boolean = true

  isShowMore: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  stopDisplay(){
    this.isDisplay = false
  }

  doEdit(){
    this.comment = this.editComment
    this.name = this.editName
  }

  showMore(){
    if(this.isShowMore == false){
      this.isShowMore = true
    }
    else{
      this.isShowMore = false
    }
  }
}
