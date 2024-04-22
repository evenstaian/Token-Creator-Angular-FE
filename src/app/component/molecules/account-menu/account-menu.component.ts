import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from './account-menu.metadata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit {

  @Input() menu: MenuItem[];
  @Output() selected: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleSelection(item: MenuItem): void {
    this.toggleMenuItemSelection(this.menu, item.title);
  }

  private toggleMenuItemSelection(items: MenuItem[], title: string): void {
    let itemSelected: MenuItem;
    for (let item of items) {
      if (item.title === title) {
        item.isSelected = !item.isSelected;
        itemSelected = item
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

    this.selected.emit(itemSelected)
  }

}
