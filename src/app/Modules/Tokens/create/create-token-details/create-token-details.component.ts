import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-create-token-details',
  templateUrl: './create-token-details.component.html',
  styleUrls: ['./create-token-details.component.css']
})
export class CreateTokenDetailsComponent implements OnInit {

  pageTitles = {
    title: "Crie seu token",
    subtitle: "Informe abaixo os dados do seu token"
  }

  formStructure: any;

  form: FormGroup;


  constructor(private fb: FormBuilder, private sharedDataService: SharedDataService, private router: Router) { 
    this.form = this.fb.group({});
    
    this.sharedDataService.formStructure.subscribe(data => { 
      this.formStructure = data;

      if(!this.formStructure){
        this.router.navigate(['/create-token']);
        return
      }

      this.formStructure.forEach(field => {
        const validators: ValidatorFn[] = [];
        if (field.required) {
          validators.push(Validators.required);
        }
        this.form.addControl(field.label, this.fb.control(field.defaultValue, validators));
      });
    });
  }

  ngOnInit(): void {
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

  goToNetworksPage(){
    if (this.form.valid) {
      this.router.navigate(['/create-token/networks']);
    } else {
      Object.keys(this.form.controls).forEach(fieldName => {
        if (this.form.get(fieldName).errors && this.form.get(fieldName).errors.required) {
          this.makeFieldInvalid(fieldName);
        }
      });
    }
  }

}
