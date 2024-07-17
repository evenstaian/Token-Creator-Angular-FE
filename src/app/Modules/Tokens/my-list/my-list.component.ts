import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AppService } from 'src/services/app.service';
import { NETWORK_TYPES, TOKEN_ACTIONS_TYPES, TOKEN_STANDARD_TYPES } from 'criptolab-types';
import { TokenTypeService } from 'src/app/shared/token-type.service';
import { Auth } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css'],
  providers: [
    Auth,
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
  showFirstTokenCTA: boolean = false;

  alertIcon="warning"
  alertTitle;
  alertMessage;
  
  constructor(
    private authService: Auth,
    private appService: AppService, 
    public tokenTypeService: TokenTypeService,
    public router: Router) { }

  ngOnInit(): void {
    this.getMyTokensList();
  }

  saveCloneTokenOnStorage(token: any){
    if(token){
      const tokenToClone = this.tokenTypeService.formatTokenToTokenTypeObj(token.raw);
      console.log({tokenToClone})
      localStorage.setItem("token-to-clone", JSON.stringify(tokenToClone));
    }
  }

  goToCreateOnMainNet(token: any){
    this.showFullscreenLoader(true);
    this.saveCloneTokenOnStorage(token);
    this.authService.getUserData().subscribe(
      data => {
        console.log({data})
        this.showFullscreenLoader(false);
        if(!data.data.plan){
          window.open("/pricing", '_blank');
          return
        }

        this.router.navigate(['/create-token/details/mainnet'])
      },
      error => {
        this.showFullscreenLoader(false);
      }
    )
  }

  goToCreateToken(){
    this.router.navigate(['/create-token'])
  }

  getMyTokensList(){
    this.showLoader(true);

    this.appService.getMyTokens().subscribe(data => {
      this.showLoader(false);
      const response: any = data;
      if(response){
        this.myTokensList = response;
      }
    },
    error => {
      this.showLoader(false);
      this.showFirstTokenCTA = true;
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

    this.interact(actionData.tokenHashId, actionData.standard, actionData.action, actionData.form, actionData.file);
  }

  interact(tokenHashId: string, standard: string, type: string, form: any, file: File){
    this.appService.interact(tokenHashId, type, standard, form, file).subscribe(data => {
      const response: any = data;
      if (response.hashId){
        this.setTokenSubscribe(tokenHashId, response.hashId, type);
        this.createTokenActionStatusResponse(tokenHashId, response.hashId, type, 'PENDING');
      }

      this.showFullscreenLoader(false);
    },
    error => {
      console.log(error);
      this.showFullscreenLoader(false);
      if(error.status){
        this.showAlert(false, "Ocorreu um erro", error.message)
        return
      }
      this.showAlert(false, "Ocorreu um erro", "Tente novamente em outro momento")
    }) 
  }

  setTokenSubscribe(tokenHashId: string, actionHashId?: string, actionType?: string) {
    this.appService.tokenSubscribe(actionHashId || tokenHashId).subscribe(
      data => { 
        const response: any = data;
        if(response.status && actionHashId) {
          this.refreshActionStatus(tokenHashId, actionType, actionHashId)
          return
          //this.createTokenActionStatusResponse(tokenHashId, actionHashId, actionType, response.status);
        }
      }, 
      error => {})
  }

  refreshActionStatus(tokenHashId: string, action: string, hashId: string){
    console.log({tokenHashId, action, hashId})
    this.appService.getActionProcess(hashId).subscribe(data => {
      const response: any = data;
      //TODO: observe event;
      this.createTokenActionStatusResponse(tokenHashId, hashId, action, response.status, response.txHash, response.scanUrl);
    },
    error => {
    }) 
  }

  async createTokenActionStatusResponse(
    tokenHashId: string, 
    hashId: string, 
    action: string, 
    status: string, 
    txHash?: string,
    scanUrl?: string,): Promise<any>{
    for(let item of this.myTokensList){
      item.actionsStatus = {};
      if(item.hashId == tokenHashId){
        console.log({hashId, status, txHash, scanUrl})
        item.actionsStatus[action] = { hashId, status, txHash, scanUrl }
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
