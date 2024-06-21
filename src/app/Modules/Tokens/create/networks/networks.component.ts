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
      items: []
    },
    {
      title: "TestNet",
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
    this.NetworkTypes = this.toIterable(NETWORK_TYPES);
    
    if(!this.isMainNet){
      this.standards.reverse();
    }

    this.sharedDataService.tokenType.subscribe(data => {
      this.tokenType = data;
    })
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
    if(networkType){
      this.tokenType.network = networkType;
      this.sharedDataService.setTokenType(this.tokenType);
      this.router.navigate(['/create-token/confirmation']);
    }
  }

}
