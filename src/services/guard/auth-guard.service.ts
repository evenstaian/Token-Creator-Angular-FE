import { CanActivate, Router } from '@angular/router'
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private rotas: Router){}

    canActivate() :boolean {
        if(localStorage.getItem('auth_token') != null){
            return true 
        }else{
            this.rotas.navigate(['/login']);
            return false
        }      
    }

}