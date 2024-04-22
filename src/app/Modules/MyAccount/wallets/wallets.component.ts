import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../component/molecules/account-menu/account-menu.metadata';
import { NETWORK_TYPES } from 'criptolab-types';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent implements OnInit {

  networkMenu: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.buildNetworkMenu()
  }

  private buildNetworkMenu(){
    const networks: any[] = this.toIterable(NETWORK_TYPES);

    const mainNetMenu: MenuItem[] = []
    const testNetMenu: MenuItem[] = []

    const mainNet: MenuItem = {
      type: "menu-1",
      title: "MainNet",
      icon: "",
      class: "",
      clickable: false,
      isSelected: false,
      show: true,
      submenu: mainNetMenu
    }

    const testNet: MenuItem = {
      type: "menu-2",
      title: "TestNet",
      icon: "",
      class: "",
      clickable: false,
      isSelected: false,
      show: true,
      submenu: testNetMenu
    }

    for(let network of networks){
      if(network.isMainNet){
        mainNetMenu.push({
          type: network.name,
          title: network.name,
          icon: network.imageUrl,
          class: "",
          clickable: true,
          isSelected: false,
          show: true
        })
      } else {
        testNetMenu.push({
          type: network.name,
          title: network.name,
          icon: network.imageUrl,
          class: "",
          clickable: true,
          isSelected: false,
          show: true
        })
      }
    }

    this.networkMenu = [testNet, mainNet]
  }

  private toIterable = (networkTypes: any): any[] => {
    return Object.keys(networkTypes).map(key => {
      return networkTypes[key];
    }).filter(obj => obj !== null);
  };

}
