import { Component, OnInit } from '@angular/core';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Clean } from 'src/utils/clean';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  showAllMenu = true;

  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: RouteInfo[] = [];

  // this is for the open close
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private sessionStorage: Clean
  ) { }

  // End open close
  ngOnInit() {
    this.createMenu()
  }

  logout(){
    this.sessionStorage.cleanAll()
    this.router.navigate(['/login'])
  }

  createMenu() {
    this.sidebarnavItems = [
      {
        path: '/my-tokens',
        title: 'Tokens',
        icon: '',
        class: 'item-name',
        extralink: false,
        show: 1,
        submenu: [
          {
            path: '/create-token',
            title: 'Criar Token',
            icon: 'mdi mdi-plus-box',
            class: '',
            extralink: false,
            show: 1,
            submenu: []
          },
          {
            path: '/my-tokens',
            title: 'Seus Tokens',
            icon: 'mdi mdi-format-list-bulleted',
            class: '',
            extralink: false,
            show: 1,
            submenu: []
          }
        ]
      },
    ]
  }
}
