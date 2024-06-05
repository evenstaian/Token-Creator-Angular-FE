import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { AppService } from '../../../../../services/app.service'
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-create-confirmation',
  templateUrl: './create-confirmation.component.html',
  styleUrls: ['./create-confirmation.component.css'],
  providers: [
    AppService
  ]
})
export class CreateConfirmationComponent implements OnInit {

  @ViewChild('swalWarningDefault') private alertSwal: SwalComponent

  tokenType: any;
  formStructure: any;
  networkType: any;
  classIdentifier: any;

  imageData: File;
  imageSrc: any = "assets/images/icons/ic_token_image.svg";
  tokenName: string = "Nome do Token"
  tokenSymbol: string = "NT"

  pageTitles = {
    title: "Está tudo certo?",
    subtitle: "Confirme todos os dados do seu token antes de lançá-lo"
  }

  loader: boolean = false;
  alertIcon="warning"
  alertTitle;
  alertMessage;

  constructor(
    private sharedDataService: SharedDataService, 
    private appService: AppService,
    private router: Router) { }

  ngOnInit(): void {
    this.sharedDataService.tokenType.subscribe(data => {
      if(!data){
        return
      }

      this.tokenType = data;
      this.formStructure = this.tokenType.form;
      this.networkType = this.tokenType.network;
      this.classIdentifier = this.tokenType.identifier;
      this.saveTokenTypeOnStorage()
    })

    this.sharedDataService.formStructure.subscribe(data => {
      this.formStructure = data;

      if(!this.formStructure){
        this.router.navigate(['/create-token']);
        return
      }

      for (let item of this.formStructure ){
        switch (item.label) {
          case "name":
            this.tokenName = item.defaultValue;
          case "symbol":
            this.tokenSymbol = item.defaultValue;
        }
      }
    });

    this.sharedDataService.tokenImage.subscribe(data => {
      if(data){
        this.imageData = data;
        this.previewImage(data);
      }
    })
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(file);
  }

  saveTokenTypeOnStorage(){
    localStorage.setItem("token-type", JSON.stringify(this.tokenType));
  }

  createToken(){
    if(!this.tokenType){
      this.showAlert(false, "Falha na Criação", "Ocorreu um erro interno ao criar seu token. Tente novamente mais tarde")
      return
    }

    if(!this.networkType){
      this.showAlert(false, "Falha na Criação", "Ocorreu um erro interno ao criar seu token. Tente novamente mais tarde")
      return
    }

    this.showLoader(true);

    this.appService.createToken(this.classIdentifier, this.tokenType, this.networkType.name, this.formStructure, this.imageData).subscribe(data => {
      this.showLoader(false);
      this.sharedDataService.setTokenType(this.tokenType);
      
      const response: {
        hashId?: string
        name?: string
        symbol?: string
        description?: string
        company?: string
        supply?: any
        isMainNet?: string
        network?: string
      } = data;

      this.sharedDataService.setCreateResponse(response);
      this.router.navigate(['/create-token/success']);
    },
    error => {
      console.log(error)
      this.showAlert(false, "Falha na Criação", "Ocorreu um erro interno ao criar seu token. Tente novamente mais tarde")
    })
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

  showLoader(status: boolean) {
    this.loader = status
  }

}
