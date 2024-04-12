import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Clean } from 'src/utils/clean';
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

  constructor(private router: Router,
    private sessionStorage: Clean) {
    this.verifyIfIsLogged()
  }

  verifyIfIsLogged(){
    const userData = localStorage.getItem('auth_token');
    if(userData){
      this.isLogged = true;
    }
  }

  logout(){
    this.sessionStorage.cleanAll()
    this.router.navigate(['/login'])
  }
}
