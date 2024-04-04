import { CanActivate, Router } from '@angular/router'
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardIn implements CanActivate {

    constructor(private rotas: Router){}

    canActivate() :boolean {
        if(localStorage.getItem('auth_token')){
            this.rotas.navigate(['/'])
            return false
        }else{
            return true
        }      
    }

}