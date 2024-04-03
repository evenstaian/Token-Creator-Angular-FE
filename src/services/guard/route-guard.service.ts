import { CanActivate, Router } from '@angular/router'
import { Injectable } from '@angular/core';

@Injectable()
export class RouteGuard implements CanActivate {

    constructor(private rotas: Router){}

    canActivate() :boolean {
        if(localStorage.getItem('dados_conta') != null){
            let dados_conta: any = JSON.parse(localStorage.getItem('dados_conta') || '{}')
            let privilegios = dados_conta.privilegies
            if(privilegios.m_dashboard!=0){
                return true 
            }else{
                this.rotas.navigate(['/login']);
                return false
            }
        }else{
            this.rotas.navigate(['/login']);
            return false
        }      
    }

}