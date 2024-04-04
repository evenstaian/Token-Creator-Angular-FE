import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-circular-thumb-image',
  templateUrl: './circular-thumb-image.component.html',
  styleUrls: ['./circular-thumb-image.component.css']
})
export class CircularThumbImageComponent implements OnInit {

  userName: string;

  constructor() { }

  ngOnInit(): void {
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
