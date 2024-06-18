import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-circular-thumb-image',
  templateUrl: './circular-thumb-image.component.html',
  styleUrls: ['./circular-thumb-image.component.css']
})
export class CircularThumbImageComponent implements OnChanges {

  @Input() imageUrl: string = "assets/images/vectors/ic_user_placeholder.svg";
  @Input() hasMessage: boolean = true;
  @Input() imgSize: number;

  userData: any;

  customSize: any;

  userName: string;

  showPremiumIcon: boolean = false;

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    if(this.hasMessage){
      this.getUserData()
    }

    this.sharedDataService.userData.subscribe( data => {
      this.userData = JSON.stringify(data);
      this.getUserData();
    })
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
    let userData: any = this.userData || localStorage.getItem('user_data');
    if(userData){
      try {
        userData = JSON.parse(userData);
        if(userData){
          this.userName = userData.name;
          if(userData.plan){
            this.showPremiumIcon = true;
          } else {
            this.showPremiumIcon = false;
          }
  
          if(this.hasMessage){
            this.imageUrl = userData.image_url;
          }
        }
      } catch (e){
        throw e
      }
    }
  }

}
