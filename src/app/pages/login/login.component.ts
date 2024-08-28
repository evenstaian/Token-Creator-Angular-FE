import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Auth } from '../../../services/auth.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { Router } from '@angular/router'
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [Auth]
})
export class LoginComponent implements OnInit {

  @ViewChild('swalWarningDefault') private alertSwal: SwalComponent

  contextRoute: string;

  pageTitles = {
    title: "Entre na sua conta",
    subtitle: "Informe seus dados abaixo"
  }

  step2Titles = {
    title: "Informe o código de validação",
    subtitle: "Agora você deve informar o código enviado para seu email cadastrado."
  }

  alertIcon = "warning"
  alertTitle = "TEste"
  alertMessage = "Teste"

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

  public errorMessage: string

  loader: boolean = false

  constructor(
    private auth: Auth,
    private router: Router,
    private sharedDataService: SharedDataService) {
  }

  ngOnInit(): void {
    this.changeStep(true, false)

    this.sharedDataService.navigationFlow.subscribe(data => {
      this.contextRoute = data.contextRoute;
    })
  }

  prepareDataLayerGTM(formName: string, formId: string) {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      'event': 'form_submit',
      'formName': formName,
      'formId': formId
    });
  }

  public preLogin(): void {
    this.prepareDataLayerGTM('PRELOGIN', 'PRELOGIN');

    this.showLoader(true);

    if (!this.formLogin.value.email
      || !this.formLogin.value.password) {
      this.showAlert(false, "Informe todos os dados", "Não esqueça nenhum dado solicitado.");
      return
    }

    this.auth.preLogin(this.formLogin.value.email, this.formLogin.value.password)
      .subscribe(data => {
        const response: any = data;
        if (response.user) {
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

  public login() {
    this.prepareDataLayerGTM('LOGIN', 'LOGIN');

    this.showLoader(true);
    this.auth.login(this.formLogin.value.email, this.formLogin.value.password, this.formCode.value.code || " ")
      .subscribe(data => {
        const response: any = data;
        if (response.user) {
          this.logged(response)
        }
      },
        error => {
          console.log(error)
          this.showLoader(false);
          this.showAlert(false, "Dados Incorretos", error);
        })
  }

  resendCode() {
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
          this.showAlert(false, "Dados Incorretos", error);
        })
  }

  logged(response: any) {
    localStorage.setItem('auth_token', response.authToken);
    localStorage.setItem('user_data', JSON.stringify(response.user));
    this.showLoader(false);
    if (!this.contextRoute) {
      this.router.navigate(['/my-tokens']);
      return
    }
    this.router.navigate([this.contextRoute]);
  }

  changeStep(step1: boolean, step2: boolean) {
    this.showLoader(false);
    this.step1 = step1;
    this.step2 = step2;
  }

  showLoader(status: boolean) {
    this.loader = status
  }

  showAlert(success: boolean, title: string, message: string) {
    this.showLoader(false);
    this.alertIcon = success ? "success" : "warning";
    this.alertTitle = title;
    this.alertMessage = message;

    setTimeout(() => {
      this.alertSwal.fire();
    }, 200);
  }
}
