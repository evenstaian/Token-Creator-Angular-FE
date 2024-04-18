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

    console.log(actionData);

    switch (actionData.action) {
      case TOKEN_ACTIONS_TYPES.MINT:
        this.mintERC20(actionData.tokenHashId, actionData.form);
        break;
      case TOKEN_ACTIONS_TYPES.TRANSFER:
        this.transferERC20(actionData.tokenHashId, actionData.form);
        break;
      default:
        this.showFullscreenLoader(false);
        this.showAlert(false, "Ocorreu um erro", "Tente novamente em outro momento")
        break;
    }
  }

  mintERC20(tokenHashId: string, form: any){
    this.appService.mintERC20(tokenHashId, form).subscribe(data => {
      this.showFullscreenLoader(false);
      this.createTokenActionStatusResponse(tokenHashId, TOKEN_ACTIONS_TYPES.MINT, 'PENDING');
    },
    error => {
      this.showFullscreenLoader(false);
      this.showAlert(false, "Ocorreu um erro", "Tente novamente em outro momento")
    }) 
  }

  transferERC20(tokenHashId: string, form: any){
    console.log("entrou aqui")
    setTimeout(async () => {
      this.showFullscreenLoader(false);
      this.createTokenActionStatusResponse(tokenHashId, TOKEN_ACTIONS_TYPES.TRANSFER, 'PENDING');
    }, 2000);
  }

  async createTokenActionStatusResponse(tokenHashId: string, action: string, status: string): Promise<any>{
    for(let item of this.myTokensList){
      item.actionsStatus = {};
      if(item.hashId == tokenHashId){
        item.actionsStatus[action] = status
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
