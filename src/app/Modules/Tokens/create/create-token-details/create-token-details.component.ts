import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-create-token-details',
  templateUrl: './create-token-details.component.html',
  styleUrls: ['./create-token-details.component.css']
})
export class CreateTokenDetailsComponent implements OnInit {

  isMainNet: boolean = false;
  tokenType: any;

  networkType: any;
  imageFile: File;

  pageTitles = {
    title: "Crie seu token",
    subtitle: "Informe abaixo os dados do seu token"
  }

  formStructure: any;

  form: FormGroup;


  constructor(
    private fb: FormBuilder, 
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute,
    private router: Router) { 
    
    this.sharedDataService.tokenType.subscribe(data => {
      if(!data){
        return
      }

      this.tokenType = data;
      
      this.formStructure = this.tokenType.form;
      this.saveTokenTypeOnStorage()
    })
    
    this.sharedDataService.formStructure.subscribe(data => { 
      if(!data){
        return
      }

      this.formStructure = data;
      this.createForm()  
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const cloneId = params.get('cloneId');
      if(cloneId){
        this.isMainNet = true;
        this.sharedDataService.setIsMainNetEnvironment(this.isMainNet);
        this.tokenType = this.getCloneTokenFromStorage();
        if(this.tokenType){
          this.formStructure = this.tokenType.form;
          this.sharedDataService.setData(this.tokenType.bannerImageUrl);
          this.createForm();
        }
      }
    });
    
    if(!this.tokenType){
      this.tokenType = this.getTokenTypeFromStorage();
      this.formStructure = this.tokenType.form;
      this.sharedDataService.setData(this.tokenType.bannerImageUrl);
      this.createForm();
    }
  }

  saveTokenTypeOnStorage(){
    localStorage.setItem("token-type", JSON.stringify(this.tokenType));
  }

  getTokenTypeFromStorage(){
    try {
      const tokenTypeString = localStorage.getItem("token-type");
      return JSON.parse(tokenTypeString);
    } catch (error) {
      return null;
    }
  }

  getCloneTokenFromStorage(){
    try {
      const tokenTypeString = localStorage.getItem("token-to-clone");
      return JSON.parse(tokenTypeString);
    } catch (error) {
      return null;
    }
  }

  deleteCloneTokenFromStorage(){
    localStorage.removeItem("token-to-clone");
  }

  createForm(){
    this.form = this.fb.group({});

    if(!this.formStructure){
      this.router.navigate(['/create-token']);
      return
    }

    this.formStructure.forEach(field => {
      const validators: ValidatorFn[] = [];
      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.validators) {
        validators.push(...field.validators);
      }

      if(field.label == "classIdentifier"){
        field.defaultValue = this.tokenType.identifier;
      }

      this.form.addControl(field.label, this.fb.control(field.defaultValue, validators));
    });

    this.form.valueChanges.subscribe((values) => {
      Object.keys(values).forEach((key) => {
        const field = this.formStructure.find((f) => f.label === key);
        if (field) {
          field.defaultValue = values[key];
          this.tokenType.form = this.formStructure;

          if(field.label == "classIdentifier"){
            field.defaultValue = this.tokenType.identifier;
          }

          this.saveTokenTypeOnStorage()
        }
      });
    });
  }

  setImageFile(file: File){
    this.imageFile = file;
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
    if(!this.tokenType){
      return
    }

    if (this.form.valid) {
      if(this.imageFile){
        this.sharedDataService.setTokenImage(this.imageFile)
      }

      this.sharedDataService.setFormStructure(this.formStructure)
      this.sharedDataService.setTokenType(this.tokenType)
      this.deleteCloneTokenFromStorage();
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
