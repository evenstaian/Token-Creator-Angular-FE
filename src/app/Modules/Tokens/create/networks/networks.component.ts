import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NETWORK_TYPES, STATUS } from 'criptolab-types';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { SoundService } from 'src/services/sound/sound.service';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.css']
})
export class NetworksComponent implements OnInit {

  tokenType: any;

  isMainNet: boolean = false;
  standards: any = [
    {
      title: "MainNet",
      subtitle: `Este ambiente é destinado a operações reais e transações em produção. Todos os dados e transações são permanentes e sujeitos às políticas de segurança e regulamentações aplicáveis. 
      Utilize com responsabilidade, pois qualquer ação realizada na rede principal é irreversível e pode ter implicações financeiras e legais significativas. 
      Certifique-se de validar todas as informações e operações antes de prosseguir.`,
      items: []
    },
    {
      title: "TestNet",
      subtitle: `Este ambiente pode ser usado em testes, 
      provas de conceito simulações mas não devem ser comercializados, distribuídos ou negociados em produção. 
      Existe a possibilidade da rede ser descontinuada ou substituída além de oscilações de performance.`,
      items: []
    }
  ]

  pageTitles = {
    title: "Escolha a rede",
    subtitle: "Entre as redes abaixo escolha a que melhor se adequa ao seu token"
  }

  NetworkTypes: any[];
  

  constructor(
    private router: Router, 
    private soundService: SoundService,
    private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.sharedDataService.tokenType.subscribe(data => {
      this.tokenType = data;
      console.log({"chamou": this.tokenType})
    })

    this.sharedDataService.isMainNetEnvironment.subscribe(data => {
      this.isMainNet = data
    })

    this.NetworkTypes = this.toIterable(NETWORK_TYPES);

    if(!this.isMainNet){
      this.standards.reverse();
    }
  }

  onHover(){
    this.soundService.playHoverSound(this.soundService.SoundTypes.SELECTION);
  }

  toIterable = (networkTypes: any): any[] => {
    return Object.keys(networkTypes).map(key => {
      if (networkTypes[key].isMainNet) {
        networkTypes[key].enable = this.isMainNet;
        this.standards[0].items.push(networkTypes[key])
      } else {
        networkTypes[key].enable = !this.isMainNet;
        this.standards[1].items.push(networkTypes[key])
      }
      return networkTypes[key];
    }).filter(obj => obj !== null);
  };

  proceed(networkType: any) {
    console.log({networkType, tokenType: this.tokenType})
    if(networkType){
      this.tokenType.network = networkType;
      this.sharedDataService.setTokenType(this.tokenType);
      this.router.navigate(['/create-token/confirmation']);
    }
  }

}
