import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Controller } from 'src/app/Modules/Payment/pricing/pricing.controller';
import { LoaderService } from 'src/app/shared/loader.service';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-adicional-data',
  templateUrl: './adicional-data.component.html',
  styleUrls: ['./adicional-data.component.css'],
})
export class AdicionalDataComponent implements OnInit {

  contextRoute: string;
  currentController: Controller;
  dataSource: any;

  formStructure: any = [
    {
      label: "cpf",
      placeholder: "informe o numero do seu CPF",
      type: "text",
      defaultValue: "",
      required: true,
      mask: "000.000.000-00",
    },
    {
      label: "mobile",
      placeholder: "qual o número do seu celular?",
      type: "text",
      defaultValue: "",
      required: true,
      mask: "(00) 00000-0000"
    },
    {
      label: "charge",
      placeholder: "qual seu cargo na empresa?",
      type: "text",
      defaultValue: "",
      required: true,
    },
    {
      label: "company",
      placeholder: "qual é o nome FANTASIA da sua empresa?",
      type: "text",
      defaultValue: "",
      required: true,
    },
    {
      label: "company_social_name",
      placeholder: "qual é a RAZÃO SOCIAL da sua empresa?",
      type: "text",
      defaultValue: "",
      required: true,
    },
    {
      label: "cnpj",
      placeholder: "qual o CNPJ da sua empresa?",
      type: "text",
      defaultValue: "",
      required: true,
      mask: "00.000.000/0000-00"
    },
    {
      label: "company_sector",
      placeholder: "e o setor dela?",
      type: "text",
      defaultValue: "",
      required: true,
    },
    {
      label: "company_activity_time",
      placeholder: "quanto tempo ela está em atividade? (anos)",
      type: "number",
      defaultValue: "",
      required: true,
    },
    {
      label: "company_anual_profit",
      placeholder: "qual o faturamento anual da empresa?",
      type: "options",
      defaultValue: "",
      required: true,
      options: [
        'menos de R$100 mil',
        'entre R$100 mil e R$1 milhão',
        'entre R$ 1 milhão e R$ 5 milhões',
        'acima de R$ 5 milhões',
      ]
    },
  ];
  form: FormGroup;

  pageTitles = {
    title: "Precisamos de mais dados sobre você",
    subtitle: "Informe os dados solicitados abaixo antes de prosseguir"
  }

  constructor(
    private fb: FormBuilder,
    private sharedDataService: SharedDataService,
    public loaderService: LoaderService,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    this.createForm()

    this.sharedDataService.navigationFlow.subscribe(data => {
      if (data.controller) {
        this.currentController = data.controller;
      }

      this.contextRoute = data.contextRoute;
      this.dataSource = data.data;
    })

  }

  createForm() {
    this.form = this.fb.group({});

    if (!this.formStructure) {
      //this.router.navigate(['/create-token']);
      return
    }

    this.formStructure.forEach(field => {
      const validators: ValidatorFn[] = [];
      if (field.required) {
        validators.push(Validators.required);
      }
      this.form.addControl(field.label, this.fb.control(field.defaultValue, validators));
    });

    this.form.valueChanges.subscribe((values) => {
      Object.keys(values).forEach((key) => {
        const field = this.formStructure.find((f) => f.label === key);
        if (field) {
          field.defaultValue = values[key];
        }
      });
    });
  }

  makeFieldInvalid(fieldName: string): void {
    if (this.form.get(fieldName)) {
      this.form.get(fieldName).setErrors({ 'required': true });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return field.invalid && (field.dirty || field.touched);
  }

  saveAditionalData() {
    if (!this.currentController) {
      if (!this.contextRoute) {
        this.location.back();
        return
      }
      this.router.navigate([this.contextRoute])
      return
    }

    this.currentController.handle({ planName: this.dataSource.planName });
  }

}
