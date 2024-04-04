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

  alertIcon="warning"
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
    this.showLoader(true);
    this.auth.preLogin(this.formLogin.value.email, this.formLogin.value.password)
      .subscribe(data => {
        const response: any = data;
        if(response.user){
          this.logged(response)
          return
        }

        this.changeStep(false, true);
      },
      error => {
        console.log(error)
        this.showLoader(false);
        this.showAlert(false, "Dados Incorretos", error);
      })
  }

  public login(){
    this.showLoader(true);
    this.auth.login(this.formLogin.value.email, this.formLogin.value.password, this.formCode.value.code || " ")
      .subscribe(data => {
        const response: any = data;
        if(response.user){
          this.logged(response)
        }
      },
      error => {
        console.log(error)
        this.showLoader(false);
        this.showAlert(false, "Dados Incorretos", error);
      })
  }

  resendCode(){
    this.showLoader(true);
    this.auth.preLogin(this.formLogin.value.email, this.formLogin.value.password)
      .subscribe(data => {
        const response: any = data;
        this.changeStep(false, true);
        this.showLoader(false);
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

  logged(response: any){
    localStorage.setItem('auth_token', response.authToken);
    localStorage.setItem('user_data', JSON.stringify(response.user));
    this.showLoader(false);
    this.router.navigate(['/criar-titulo']);
  }

  changeStep(step1: boolean, step2: boolean){
    this.showLoader(false);
    this.step1 = step1;
    this.step2 = step2;
  }

  showLoader(status: boolean) {
    this.loader = status
  }

  showAlert(success: boolean, title: string, message: string){
    this.showLoader(false);
    this.alertIcon = success ? "success" : "warning";
    this.alertTitle = title;
    this.alertMessage = message;

    setTimeout(() => {
      this.alertSwal.fire();
    }, 200);
  }
}
