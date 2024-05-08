import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-circular-thumb-image',
  templateUrl: './circular-thumb-image.component.html',
  styleUrls: ['./circular-thumb-image.component.css']
})
export class CircularThumbImageComponent implements OnChanges {

  @Input() imageUrl: string = "assets/images/vectors/ic_user_placeholder.svg";
  @Input() hasMessage: boolean = true;
  @Input() imgSize: number;

  customSize: any;

  userName: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.hasMessage)
    this.getUserData()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.imgSize){
      this.customSize = {
        width: `${this.imgSize}px`,
        height: `${this.imgSize}px`
      }
    }
  }

  getUserData(){
    let userData: any = localStorage.getItem('user_data');
    if(userData){
      try {
        userData = JSON.parse(userData);
        this.userName = userData.name;
      } catch (e){
        throw e
      }
    }
  }

}
