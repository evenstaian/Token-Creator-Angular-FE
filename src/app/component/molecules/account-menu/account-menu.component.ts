import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from './account-menu.metadata';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit {

  @Input() menu: MenuItem[];

  constructor() { }

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

      if(item.submenu){
        if (item.submenu.length) {
          this.toggleMenuItemSelection(item.submenu, title);
        }
      }
    }
  }

}
