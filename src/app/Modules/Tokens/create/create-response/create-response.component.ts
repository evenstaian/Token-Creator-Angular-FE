import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-create-response',
  templateUrl: './create-response.component.html',
  styleUrls: ['./create-response.component.css'],
  providers: [
    AppService
  ]
})
export class CreateResponseComponent implements OnInit {

  networkType: any = {};
  createResponse: any = {};

  constructor(
    private sharedDataService: SharedDataService,
    private appService: AppService 
    ) {
    this.sharedDataService.createResponse.subscribe(data => {
      if (data){
        this.createResponse = data;
        this.createResponse.status = "PENDING";

        if(this.createResponse.hashId){
          this.setTokenSubscribe(this.createResponse.hashId);
        }
      }
    })

    this.sharedDataService.tokenType.subscribe(data => {
      if (data){
        this.networkType = data.network;
      }
    })
   }

  ngOnInit(): void {
  }

  setTokenSubscribe(hashId: string) {
    this.appService.tokenSubscribe(hashId).subscribe(
      data => { 
        const response: any = data;
        console.log(data);
      }, 
      error => {})
  }

}
