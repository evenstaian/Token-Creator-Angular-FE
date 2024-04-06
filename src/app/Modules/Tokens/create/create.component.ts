import { Component, OnInit} from '@angular/core';
import { SharedDataService } from '../../../shared/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  pageTitles = {
    title: "Crie seu próprio token",
    subtitle: "Que tipo de token você deseja criar? "
  }

  ERC20_FORM = [
    {
      label: "name",
      placeholder: "nome do seu token",
      type: "text",
      defaultValue: "",
    },
    {
      label: "symbol",
      placeholder: "qual o símbolo? ex: BTC",
      type: "text",
      defaultValue: "",
    },
    {
      label: "description",
      placeholder: "qual a descrição?",
      type: "textarea",
      defaultValue: "",
    },
    {
      label: "quantity",
      placeholder: "qual é a quantidade emitida?",
      type: "number",
      defaultValue: "",
    },
    {
      label: "company",
      placeholder: "qual é o nome da sua empresa?",
      type: "number",
      defaultValue: "",
    },
  ]

  TokenTypes = [
    {
      label: "Fan/Sport Token",
      bannerImageUrl: "assets/images/big/nature.png",
      form: this.ERC20_FORM,
      status: "ACTIVED"
    },
    {
      label: "Crédito de Carbono e ESG",
      bannerImageUrl: "",
      form: this.ERC20_FORM,
      status: "ACTIVED"
    },
    {
      label: "Rewards/Cashback Token",
      bannerImageUrl: "",
      form: this.ERC20_FORM,
      status: "SOON"
    }
  ]

  constructor(private sharedDataService: SharedDataService, private router: Router) { }

  ngOnInit(): void {
  }

  openDetails(){
    this.sharedDataService.setData(this.TokenTypes[0].bannerImageUrl);
    this.sharedDataService.setFormStructure(this.TokenTypes[0].form)
    this.router.navigate(['/create-token/details'])
  }

}
