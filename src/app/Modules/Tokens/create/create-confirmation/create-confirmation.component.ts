import { Component, OnInit } from '@angular/core';
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

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.sharedDataService.formStructure.subscribe(data => {
      this.formStructure = data;
    });
  }

}
