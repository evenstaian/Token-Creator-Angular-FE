import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-collection-items',
  templateUrl: './collection-items.component.html',
  styleUrls: ['./collection-items.component.css']
})
export class CollectionItemsComponent implements OnInit {
  @Input() collectionItems = [
    {
      id: 1,
      imageUrl: "",
      itemId: 1,
      isSelected: false,
    },
    {
      id: 2,
      imageUrl: "",
      itemId: 2,
      isSelected: false,
    },
    {
      id: 3,
      imageUrl: "",
      itemId: 3,
      isSelected: false,
    }
  ]

  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  imagePlaceholder="assets/images/icons/ic_token_image.svg";

  constructor() { }

  ngOnInit(): void {
  }

  toggleSelection(item: any): void {
    this.toggleMenuItemSelection(this.collectionItems, item.itemId);
  }

  private toggleMenuItemSelection(items: any[], itemId: number): void {
    let itemSelected: any;
    for (let item of items) {
      if (item.itemId === itemId) {
        item.isSelected = !item.isSelected;
        itemSelected = item
      }

      if (item.itemId != itemId) {
        item.isSelected = false;
      }
    }

    this.selected.emit(itemSelected)
  }

}
