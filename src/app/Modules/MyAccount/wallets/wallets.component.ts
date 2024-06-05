import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../component/molecules/account-menu/account-menu.metadata';
import { NETWORK_TYPES } from 'criptolab-types';
import { AppService } from 'src/services/app.service';
import { LoaderService } from 'src/app/shared/loader.service';

interface WalletModelResponse {
  balance: number,
  walletAddress: string,
}

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css'],
  providers: [
    AppService
  ]
})
export class WalletsComponent implements OnInit {

  networkMenu: MenuItem[] = [];

  response: WalletModelResponse;

  constructor(private appService: AppService, public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader(true)
    this.buildNetworkMenu()
    this.initWallet()
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

  private initWallet(){
    this.networkMenu.forEach(menu => {
      if(menu.type == "menu-2"){
        this.getWalletData(menu.submenu[0].title);
      }
    })
  }

  openMenuItem(networkMenuItem: MenuItem){
    this.response = null;
    if(networkMenuItem.type){
      this.getWalletData(networkMenuItem.type)
    }
  }

  private getWalletData(network: string){
    this.loaderService.showLoader(true)
    this.appService.getWalletData(network).subscribe(
      data => {
        this.response = data as WalletModelResponse;
        this.loaderService.showLoader(false);
        this.makeNetworkSelected(network);
      }, 
      error => {
        this.loaderService.showLoader(false)
        this.response = null;
      })
  }

  private makeNetworkSelected(network: string){
    this.networkMenu.forEach(menu => {
      menu.submenu.forEach(submenu => {
        if(submenu.title == network){
          submenu.isSelected = true;
        }
      })
    })
  }

}
