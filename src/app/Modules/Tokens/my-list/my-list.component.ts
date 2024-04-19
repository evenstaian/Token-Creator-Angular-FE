import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AppService } from 'src/services/app.service';
import { TOKEN_ACTIONS_TYPES } from 'criptolab-types';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css'],
  providers: [
    AppService
  ]
})
export class MyListComponent implements OnInit {

  @ViewChild('swalWarningDefault') private alertSwal: SwalComponent

  imagePlaceholder="assets/images/icons/ic_token_image.svg";

  pageTitles = {
    title: "Seus tokens",
    subtitle: "Veja os tokens que você já criou"
  }

  myTokensList: any;

  ButtonsTypes = {
    MINT: {
      color: "#00A34B"
    },
    TRANSFER: {
      color: "#0780B4"
    },
    BURN: {
      color: "#810202"
    }
  }

  loader: boolean = false;
  fullLoader: boolean = false;

  alertIcon="warning"
  alertTitle;
  alertMessage;
  
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getMyTokensList();
  }

  getMyTokensList(){
    this.showLoader(true);

    this.appService.getUserData().subscribe(data => {
      this.showLoader(false);
      const response: any = data;
      if(response.tokensQueued){
        this.myTokensList = response.tokensQueued;
      }
    },
    error => {
      this.showLoader(false);
    }) 
  }

  showLoader(status: boolean) {
    this.loader = status
  }

  showFullscreenLoader(status: boolean) {
    this.fullLoader = status
  }

  showAction(token: any, action: string){
    for (let item of this.myTokensList){
      if (item.hashId == token.hashId) {
        item.actionOpened = item.actionOpened == action ? undefined : action;
      }
    }
  }

  processAction(actionData: any){
    this.showFullscreenLoader(true);

    if(!TOKEN_ACTIONS_TYPES[actionData.action]){
      this.showFullscreenLoader(false);
      this.showAlert(false, "Ocorreu um erro", "Tente novamente em outro momento");
      return
    }

    this.interactERC20(actionData.tokenHashId, actionData.action, actionData.form);
  }

  interactERC20(tokenHashId: string, type: string, form: any){
    this.appService.interactERC20(tokenHashId, type, form).subscribe(data => {
      const response: any = data;
      if (response.hashId){
        //TODO: observe event;
        this.createTokenActionStatusResponse(tokenHashId, response.hashId, type, 'PENDING');
      }

      this.showFullscreenLoader(false);
    },
    error => {
      this.showFullscreenLoader(false);
      this.showAlert(false, "Ocorreu um erro", "Tente novamente em outro momento")
    }) 
  }

  refreshActionStatus(tokenHashId: string, action: string, hashId: string){
    console.log({tokenHashId, action, hashId})
    this.appService.getActionProcess(hashId).subscribe(data => {
      const response: any = data;
      //TODO: observe event;
      this.createTokenActionStatusResponse(tokenHashId, hashId, action, response.status);
    },
    error => {
    }) 
  }

  async createTokenActionStatusResponse(tokenHashId: string, hashId: string, action: string, status: string): Promise<any>{
    for(let item of this.myTokensList){
      item.actionsStatus = {};
      if(item.hashId == tokenHashId){
        item.actionsStatus[action] = { hashId, status }
        return item
      }
    }
  }

  showAlert(success: boolean, title: string, message: string){
    this.showLoader(false);
    this.alertIcon = success ? "success" : "warning";
    this.alertTitle = title;
    this.alertMessage = message;

    setTimeout(() => {
      this.alertSwal.fire();
    }, 200);
  }

}
