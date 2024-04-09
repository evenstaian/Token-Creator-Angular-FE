import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-create-confirmation',
  templateUrl: './create-confirmation.component.html',
  styleUrls: ['./create-confirmation.component.css']
})
export class CreateConfirmationComponent implements OnInit {

  formStructure: any;

  imageSrc;
  tokenName: string = "Nome do Token"
  tokenSymbol: string = "NT"

  pageTitles = {
    title: "Está tudo certo?",
    subtitle: "Confirme todos os dados do seu token antes de lançá-lo"
  }

  constructor(private sharedDataService: SharedDataService, private router: Router) { }

  ngOnInit(): void {
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

}
