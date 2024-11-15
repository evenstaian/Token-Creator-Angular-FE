import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { AppService } from 'src/services/app.service';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-create-response',
  templateUrl: './create-response.component.html',
  styleUrls: ['./create-response.component.css'],
  providers: [
    AppService
  ]
})
export class CreateResponseComponent implements OnInit {

  pageTitles = {
    title: "Seu token está em sendo criado...",
    subtitle: "Ele está sendo lançado na rede"
  }

  imagePlaceholder="assets/images/icons/ic_token_image.svg";
  networkType: any = {};
  createResponse: any = {};

  constructor(
    private sharedDataService: SharedDataService,
    private appService: AppService,
    private router: Router,
    private notificationService: NotificationService
    ) {
    this.sharedDataService.createResponse.subscribe(data => {
      if (data){
        this.createResponse = data;
        this.createResponse.status = "PENDING";

        if(this.createResponse.hashId){
          this.setTokenSubscribe(this.createResponse.hashId);
          setTimeout(() => {
            this.goToMyTokensList()
          }, 30000);
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
    this.createResponse.status = "PENDING";
  }

  setTokenSubscribe(hashId: string) {
    this.appService.tokenSubscribe(hashId).subscribe(
      data => { 
        const response: any = data;
        this.createResponse.status = response.status;
        if(response.status == "CONFIRMED"){
          this.notificationService.showSuccess(`[DEPLOY] Token lançado com sucesso!`);
        }
        console.log(data);
      }, 
      error => {})
  }

  goToMyTokensList(){
    this.router.navigate(["/my-tokens"])
  }

  goToScan(){
    if(this.createResponse){
      const url = this.createResponse.scanUrl;
      if(!url){
        return
      }
      window.open(url, '_blank');
    }
  }

}
