import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/services/auth.service';
import { Clean } from 'src/utils/clean';
import { SharedDataService } from '../shared-data.service';
//declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  providers: [
    Auth
  ]
})
export class NavigationComponent implements OnInit {
  @Output()
  toggleSidebar = new EventEmitter<void>();

  @Input() showLogo: boolean = true;
  isLogged: boolean = false;

  public showSearch = false;

  constructor(
    private authService: Auth,
    private sharedDataService: SharedDataService,
    private router: Router,
    private sessionStorage: Clean) {
    this.verifyIfIsLogged()
  }

  ngOnInit(): void {
    const authToken = localStorage.getItem('auth_token');
    if(authToken){
      this.getUserData();
    }
  }

  verifyIfIsLogged(){
    const userData = localStorage.getItem('auth_token');
    if(userData){
      this.isLogged = true;
    }
  }

  getUserData() {
    this.authService.getUserData().subscribe(
      data => {
        console.log({data})
        if(data.data){
          this.sharedDataService.setUserData(data.data);
          localStorage.setItem('user_data', JSON.stringify(data.data))
        }
      },
      error => {
        console.log({error})
      }
    )
  }

  logout(){
    this.sessionStorage.cleanAll()
    this.router.navigate(['/login'])
  }
}
