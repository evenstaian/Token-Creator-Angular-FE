import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../component/molecules/account-menu/account-menu.metadata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  menu: MenuItem[] = [
    {
      type: 'PROFILE',
      title: 'Meus Dados',
      icon: 'assets/images/icons/ic_myaccount.svg',
      class: '',
      clickable: false,
      isSelected: false,
      show: true,
      submenu: []
    },
    {
      type: 'WALLET',
      title: 'Carteiras',
      icon: 'assets/images/icons/ic_wallets.svg',
      class: '',
      router: '/my-account/wallets',
      clickable: false,
      isSelected: false,
      show: true,
      submenu: []
    },
    {
      type: 'SUBSCRIPTION',
      title: 'Assinatura',
      icon: 'assets/images/icons/ic_subscription.svg',
      class: '',
      clickable: false,
      isSelected: false,
      show: true,
      submenu: []
    },
    {
      type: 'ABOUT',
      title: 'Sobre',
      icon: 'assets/images/icons/ic_about.svg',
      class: '',
      clickable: false,
      isSelected: false,
      show: true,
      submenu: []
    },
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleSelection(title: string): void {
    this.toggleMenuItemSelection(this.menu, title);
  }

  private toggleMenuItemSelection(items: MenuItem[], title: string): void {
    for (let item of items) {
      if (item.title === title) {
        item.isSelected = !item.isSelected;
      }

      if (item.title != title) {
        item.isSelected = false;
      }

      if (item.submenu.length > 0) {
        this.toggleMenuItemSelection(item.submenu, title);
      }
    }
  }

  openMenuItem(menuItem: MenuItem){
    if(menuItem?.router){
      this.router.navigate([menuItem.router])
      return
    }

    this.router.navigate(["/my-account"])
  }

}
