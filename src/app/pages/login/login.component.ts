import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Auth } from '../../../services/auth.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { Router, Routes } from '@angular/router'

import { NETWORK_TYPES, STATUS } from 'criptolab-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [Auth]
})
export class LoginComponent implements OnInit {

  @ViewChild('swalWarningDefault') private alertSwal: SwalComponent
  @ViewChild('swalWarning1') private atencaoSwalLogin: SwalComponent
  @ViewChild('swalWarning2') private atencaoSwalCode: SwalComponent
  @ViewChild('swalWarning3') private atencaoSwalCodeError: SwalComponent

  alertTitle="TEste"
  alertMessage="Teste"

  public formLogin: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'password': new FormControl(null)
  })

  public formCode: FormGroup = new FormGroup({
    'code': new FormControl(null)
  })

  public cpf_mask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]

  public resposta_dados: any = [];
  public dados_conta: any = [];
  public sessaotoken: string = '';

  public step1 = false;
  public step2 = false;

  public cpf: string;
  public password: string;

  public errorMessage : string

  loader: boolean = false

  constructor(
    private auth: Auth,
    private router: Router) { 

      console.log(NETWORK_TYPES.MUMBAI)
      console.log(STATUS.enabled)
    }

  ngOnInit(): void {
    this.changeStep(true, false)
  }

  public preLogin(): void {
    this.router.navigate(['/criar-titulo']);
  }

  public login(){
    this.showLoader(true);
    this.auth.login(this.formLogin.value.email, this.formLogin.value.password, this.formCode.value.code || " ")
      .subscribe(data => {
        const response: any = data;
        localStorage.setItem('auth_token', response.authToken);
        this.showLoader(false);
        this.router.navigate(['/']);
      },
      error => {
        console.log(error)
        this.showLoader(false);
        this.errorMessage = error
        setTimeout(() => {
          this.alertSwal.fire();
        }, 200);
      })
  }

  resendCode(){
    this.showLoader(true);
    this.auth.preLogin(this.cpf, this.password)
      .subscribe(data =>{
        if (data != null) {
          let datas : any = data;
         
          if (datas.code === 200) {
            this.showLoader(false);
            this.atencaoSwalCodeError.fire()
          } else {
            this.showLoader(false);
            
          }
        }
      })
  }

  changeStep(step1: boolean, step2: boolean){
    this.step1 = step1;
    this.step2 = step2;
  }

  showLoader(status: boolean) {
    this.loader = status
  }
}
