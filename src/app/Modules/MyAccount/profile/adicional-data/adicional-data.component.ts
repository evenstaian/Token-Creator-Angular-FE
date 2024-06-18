import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-adicional-data',
  templateUrl: './adicional-data.component.html',
  styleUrls: ['./adicional-data.component.css']
})
export class AdicionalDataComponent implements OnInit {

  formStructure: any = [
    {
        label: "cpf",
        placeholder: "informe o numero do seu documento",
        type: "text",
        defaultValue: "",
        required: true,
    },
    {
        label: "celular",
        placeholder: "qual o número do seu celular?",
        type: "text",
        defaultValue: "",
        required: true,
    },
    {
        label: "mobile",
        placeholder: "qual o número do seu celular?",
        type: "text",
        defaultValue: "",
        required: true,
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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.form = this.fb.group({});

    if(!this.formStructure){
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

  saveAditionalData(){
    console.log(this.formStructure)
  }

}
