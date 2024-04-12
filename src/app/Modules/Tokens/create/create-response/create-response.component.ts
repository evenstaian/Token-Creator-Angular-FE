import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-create-response',
  templateUrl: './create-response.component.html',
  styleUrls: ['./create-response.component.css']
})
export class CreateResponseComponent implements OnInit {

  networkType: any = {};
  createResponse: any = {};

  constructor(private sharedDataService: SharedDataService) {
    this.sharedDataService.createResponse.subscribe(data => {
      if (data){
        this.createResponse = data;
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

}
