import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
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

  pdfSrc = "assets/documents/FTC_TERMOS_DE_USO_AGOSTO24.pdf"
  isTermsShowing = false;

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

  public formPreSignup: FormGroup;

  public formSignup: FormGroup = new FormGroup({
    'name': new FormControl(null),
    'code': new FormControl(null)
  })

  public step1 = false;
  public step2 = false;

  public errorMessage: string

  loader: boolean = false

  passwordStrength: string = '';
  passwordRules = {
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumbers: false,
    hasSpecialChars: false,
    lengthValid: false,
    confirmPassword: false,
  };

  constructor(
    private auth: Auth,
    private router: Router,
    private fb: FormBuilder) {
    this.formPreSignup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator.bind(this)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: this.confirmPasswordValidator.bind(this)
    });
  }

  ngOnInit(): void {
    this.changeStep(true, false)
  }

  passwordValidator(control) {
    const password = control.value;
    if (!password) return null;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const lengthValid = password.length >= 8;
    const confirmPassword = false;

    this.passwordRules = { hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars, lengthValid, confirmPassword };

    if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars && lengthValid) {
      this.passwordStrength = 'strong';
    } else if (lengthValid && (hasUpperCase || hasLowerCase) && (hasNumbers || hasSpecialChars)) {
      this.passwordStrength = 'medium';
    } else {
      this.passwordStrength = 'weak';
    }

    if (!this.passwordStrength) {
      return { passwordInvalid: true };
    }

    if (password !== confirmPassword) {
      this.passwordRules.confirmPassword = false;
      return { passwordInvalid: true };
    }

    this.passwordRules.confirmPassword = true;

    return null;
  }

  confirmPasswordValidator(formGroup: FormGroup) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (password !== confirmPassword) {
      this.passwordRules.confirmPassword = false;
      return { passwordInvalid: true };
    }

    this.passwordRules.confirmPassword = true;
    return null
  }

  public preSignup(): void {
    this.showLoader(true);

    if (!this.formPreSignup.value.email
      || !this.formPreSignup.value.password
      || !this.formPreSignup.value.confirmPassword) {
      this.showAlert(false, "Informe todos os dados", "Não esqueça nenhum dado solicitado.");
      return
    }

    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    if (!isValidEmail(this.formPreSignup.value.email)) {
      this.showAlert(false, "Erro na Senha", "Você deve informar um email válido");
      return
    }

    if (this.formPreSignup.value.password != this.formPreSignup.value.confirmPassword) {
      this.showAlert(false, "Erro na Senha", "As senhas não conferem. Elas devem ser iguais!");
      return
    }


    const areAllRulesValid = () => {
      return Object.values(this.passwordRules).every(rule => rule === true);
    }

    if (!areAllRulesValid()) {
      this.showAlert(false, "Erro na Senha", "A senha deve estar de acordo com todas as regras");
      return
    }

    // this.auth.preSignup(this.formPreSignup.value.email, this.formPreSignup.value.password)
    //   .subscribe(data => {
    //     const response: any = data;
    //     if (response.user) {
    //       this.logged(response)
    //       return
    //     }

    //     this.changeStep(false, true);
    //   },
    //     error => {
    //       console.log(error)
    //       this.showLoader(false);
    //       this.showAlert(false, "Dados Incorretos", error);
    //     })
  }

  public signup() {
    this.showLoader(true);
    this.auth.signup(this.formPreSignup.value.email, this.formPreSignup.value.password, this.formSignup.value.name, this.formSignup.value.code)
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

  logged(response: any) {
    localStorage.setItem('auth_token', response.authToken);
    localStorage.setItem('user_data', JSON.stringify(response.user));
    this.showLoader(false);
    this.router.navigate(['/my-tokens']);
  }

  changeStep(step1: boolean, step2: boolean) {
    this.showLoader(false);
    this.step1 = step1;
    this.step2 = step2;
  }

  showLoader(status: boolean) {
    this.loader = status
  }

  showTerms() {
    this.isTermsShowing = !this.isTermsShowing;
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

