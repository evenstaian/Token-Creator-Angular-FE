import { Component, EventEmitter, Input, Output } from '@angular/core';
//declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  @Output()
  toggleSidebar = new EventEmitter<void>();

  @Input() showLogo: boolean = true;
  isLogged: boolean = false;

  public showSearch = false;

  constructor() {
    this.verifyIfIsLogged()
  }

  verifyIfIsLogged(){
    const userData = localStorage.getItem('auth_token');
    if(userData){
      this.isLogged = true;
    }
  }
}
