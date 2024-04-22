export interface MenuItem {
    type: string,
    title: string,
    icon: string,
    class: string,
    clickable: boolean,
    isSelected: boolean,
    show: boolean,
    submenu?: MenuItem[]
  }