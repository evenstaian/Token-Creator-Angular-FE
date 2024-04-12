import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { AppService } from '../../../../../services/app.service'

@Component({
  selector: 'app-create-confirmation',
  templateUrl: './create-confirmation.component.html',
  styleUrls: ['./create-confirmation.component.css'],
  providers: [AppService]
})
export class CreateConfirmationComponent implements OnInit {

  tokenType: any;
  formStructure: any;
  networkType: any;

  imageData: File;
  imageSrc;
  tokenName: string = "Nome do Token"
  tokenSymbol: string = "NT"

  pageTitles = {
    title: "Está tudo certo?",
    subtitle: "Confirme todos os dados do seu token antes de lançá-lo"
  }

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
      return
    }

    if(!this.networkType){
      return
    }

    this.appService.createERC20(this.networkType.name, this.formStructure, this.imageData).subscribe(data => {
      const response: any = data;
      console.log({response});
    },
    error => {
      console.log(error)
    })


    //this.router.navigate(['/success']);
  }

}
