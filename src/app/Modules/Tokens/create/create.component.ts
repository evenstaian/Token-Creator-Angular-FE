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
      required: false,
    },
    {
      label: "symbol",
      placeholder: "qual o símbolo? ex: BTC",
      type: "text",
      defaultValue: "",
      required: true,
    },
    {
      label: "description",
      placeholder: "qual a descrição?",
      type: "textarea",
      defaultValue: "",
      required: true,
    },
    {
      label: "quantity",
      placeholder: "qual é a quantidade emitida?",
      type: "number",
      defaultValue: "",
      required: true,
    },
    {
      label: "company",
      placeholder: "qual é o nome da sua empresa?",
      type: "text",
      defaultValue: "",
      required: true,
    },
  ]

  TokenTypes = [
    {
      label: "Fan/Sport Token",
      bannerImageUrl: "assets/images/big/sport.png",
      form: this.ERC20_FORM,
      status: "ACTIVED"
    },
    {
      label: "Crédito de Carbono e ESG",
      bannerImageUrl: "assets/images/big/nature.png",
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

  openDetails(tokenType: any){
    this.sharedDataService.setData(tokenType.bannerImageUrl);
    this.sharedDataService.setFormStructure(tokenType.form)
    this.router.navigate(['/create-token/details'])
  }

}
