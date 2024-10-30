import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private rotas: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :boolean {
        console.log('URL destino:', state.url);
        if(state.url.includes('/token')){
            return true;
        }
        
        if(localStorage.getItem('auth_token')){
            return true 
        }else{
            this.rotas.navigate(['/login']);
            return false
        }      
    }

}