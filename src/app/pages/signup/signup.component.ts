import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Auth } from '../../../services/auth.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { Router, Routes } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [Auth]
})
export class SignupComponent implements OnInit {

  @ViewChild('swalWarningDefault') private alertSwal: SwalComponent

  step1Titles = {
    title: "Crie uma conta",
    subtitle: "Informe seus dados abaixo"
  }

  step2Titles = {
    title: "Confirme o acesso ao seu email",
    subtitle: "Informe o código recebido no seu email"
  }

  alertIcon: string;
  alertTitle: string;
  alertMessage: string;

  public formPreSignup: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'password': new FormControl(null),
    'confirmPassword': new FormControl(null)
  })

  public formSignup: FormGroup = new FormGroup({
    'name': new FormControl(null),
    'code': new FormControl(null)
  })

  public step1 = false;
  public step2 = false;

  public errorMessage : string

  loader: boolean = false

  constructor(
    private auth: Auth,
    private router: Router) { 
    }

  ngOnInit(): void {
    this.changeStep(true, false)
  }

  public preSignup(): void {
    this.showLoader(true);

    if(!this.formPreSignup.value.email 
      || !this.formPreSignup.value.password 
      || !this.formPreSignup.value.confirmPassword){
      this.showAlert(false, "Informe todos os dados", "Não esqueça nenhum dado solicitado.");
      return
    }

    if(this.formPreSignup.value.password != this.formPreSignup.value.confirmPassword){
      this.showAlert(false, "Erro na Senha", "As senhas não conferem. Elas devem ser iguais!");
      return
    }

    this.auth.preSignup(this.formPreSignup.value.email, this.formPreSignup.value.password)
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

  public signup(){
    this.showLoader(true);
    this.auth.signup(this.formPreSignup.value.email, this.formPreSignup.value.password, this.formSignup.value.name, this.formSignup.value.code)
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
    this.auth.preSignup(this.formPreSignup.value.email, this.formPreSignup.value.password)
      .subscribe(data => {
        const response: any = data;
        this.changeStep(false, true);
        this.showLoader(false);
      },
      error => {
        console.log(error)
        this.showLoader(false);
        this.showAlert(false, "Dados Incorretos", error);
      })
  }

  logged(response: any){
    localStorage.setItem('auth_token', response.authToken);
    localStorage.setItem('user_data', JSON.stringify(response.user));
    this.showLoader(false);
    this.router.navigate(['/my-tokens']);
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

