// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  extralink: boolean;
  show: number;
  submenu: RouteInfo[];
  new?: Boolean;
}
