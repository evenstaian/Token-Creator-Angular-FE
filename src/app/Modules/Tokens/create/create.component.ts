import { Component, OnInit} from '@angular/core';
import { SharedDataService } from '../../../shared/shared-data.service';
import { Router } from '@angular/router';

import { TOKEN_STANDARD_TYPES, STATUS } from 'criptolab-types';
import { SoundService } from 'src/services/sound/sound.service';

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
      identifier: "FST",
      bannerImageUrl: "assets/images/big/sport.png",
      type: TOKEN_STANDARD_TYPES.ERC20,
      form: this.ERC20_FORM,
      status: STATUS.enabled,
    },
    {
      label: "Crédito de Carbono e ESG",
      identifier: "CCESG",
      bannerImageUrl: "assets/images/big/nature.png",
      type: TOKEN_STANDARD_TYPES.ERC20,
      form: this.ERC20_FORM,
      status: STATUS.enabled,
    },
    {
      label: "Rewards/Cashback Token",
      identifier: "RCT",
      bannerImageUrl: "",
      type: TOKEN_STANDARD_TYPES.ERC20,
      form: this.ERC20_FORM,
      status: STATUS.soon,
    }
  ]

  constructor(
    private sharedDataService: SharedDataService, 
    private router: Router,
    private soundService: SoundService) { }

  ngOnInit(): void {
  }

  onHover(tokenType: any): void {
    if(tokenType.status != STATUS.enabled){
      return
    }
    this.soundService.playHoverSound(this.soundService.SoundTypes.SELECTION);
  }

  openDetails(tokenType: any){
    if(tokenType.status != STATUS.enabled){
      this.soundService.playHoverSound(this.soundService.SoundTypes.ERROR);
      return
    }
    this.sharedDataService.setTokenType(tokenType);
    this.sharedDataService.setData(tokenType.bannerImageUrl);
    this.sharedDataService.setFormStructure(tokenType.form)
    this.router.navigate(['/create-token/details'])
  }

}
