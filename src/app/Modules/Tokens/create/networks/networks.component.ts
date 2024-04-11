import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NETWORK_TYPES, STATUS } from 'criptolab-types';
import { SoundService } from 'src/services/sound/sound.service';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.css']
})
export class NetworksComponent implements OnInit {

  isMainNet: boolean = false;

  pageTitles = {
    title: "Escolha a rede",
    subtitle: "Entre as redes abaixo escolha a que melhor se adequa ao seu token"
  }

  NetworkTypes: any[];
  

  constructor(private router: Router, private soundService: SoundService) { }

  ngOnInit(): void {
    this.NetworkTypes = this.toIterable(NETWORK_TYPES);
  }

  onHover(){
    this.soundService.playHoverSound(this.soundService.SoundTypes.SELECTION);
  }

  toIterable = (networkTypes: any): any[] => {
    return Object.keys(networkTypes).map(key => {
      if (networkTypes[key].isMainNet === this.isMainNet) {
        return networkTypes[key];
      }
      return null;
    }).filter(obj => obj !== null);
  };

  proceed(networkType: any) {
    this.router.navigate(['/create-token/confirmation']);
  }

}
