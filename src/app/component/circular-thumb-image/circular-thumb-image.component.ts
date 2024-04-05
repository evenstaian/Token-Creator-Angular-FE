import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circular-thumb-image',
  templateUrl: './circular-thumb-image.component.html',
  styleUrls: ['./circular-thumb-image.component.css']
})
export class CircularThumbImageComponent implements OnInit {

  @Input() imageUrl: string = "assets/images/users/4.jpg";
  @Input() hasMessage: boolean = true;

  userName: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.hasMessage)
    this.getUserData()
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
