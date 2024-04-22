import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-token-actions',
  templateUrl: './token-actions.component.html',
  styleUrls: ['./token-actions.component.css']
})
export class TokenActionsComponent implements OnChanges {

  @Input() action: string;
  @Input() token: any;
  @Input() statusResponse: any = {
    MINT: "PENDING",
    TRANSFER: "PENDING",
    BURN: "PENDING",
  };
  @Output() actionForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() refreshStatus: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  isEditMode: boolean = true;
  isNewAction: boolean = true; 

  QUANTITY_FORM_ITEM = {
    label: "quantity",
    placeholder: "qual a quantidade?",
    type: "number",
    defaultValue: "",
    required: true,
  }

  ADDRESS_TO_FORM_ITEM = {
    label: "address_to",
    placeholder: "para qual endereço? (deixe vazio se não houver um destino ainda)",
    type: "text",
    defaultValue: "",
    required: false,
  }

  SCAN_URL_FORM_ITEM = {
    label: "scan_url",
    placeholder: "Veja na scan",
    defaultValue: "",
  }

  TXHASH_URL_FORM_ITEM = {
    label: "scan_url",
    placeholder: "Veja na scan",
    defaultValue: "",
  }

  MINT_FORM = [
    this.QUANTITY_FORM_ITEM,
    this.ADDRESS_TO_FORM_ITEM,
  ]

  TRANSFER_ADDRESS_TO_FORM_ITEM = () => {
    let FORM = this.ADDRESS_TO_FORM_ITEM;
    FORM.placeholder = "para qual endereço?"
    return FORM
  }

  TRANSFER_FORM = [
    this.QUANTITY_FORM_ITEM,
    this.TRANSFER_ADDRESS_TO_FORM_ITEM(),
  ]

  BURN_FORM = [
    this.QUANTITY_FORM_ITEM
  ]

  formStructure: any = {
    MINT: this.MINT_FORM,
    TRANSFER: this.TRANSFER_FORM,
    BURN: this.BURN_FORM,
  }

  ButtonsTypes = {
    MINT: {
      color: "#00A34B",
      label: "MINTAR"
    },
    TRANSFER: {
      color: "#0780B4",
      label: "TRANSFERIR"
    },
    BURN: {
      color: "#810202",
      label: "QUEIMAR"
    }
  }

  tokenDetails = [
    {
      name: "address",
      label: "Endereço na Blockchain",
      value: ""
    },
    {
      name: "type",
      label: "Tipo do Token",
      value: ""
    }
  ]

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.action) {
      this.isEditMode = true;
      this.isNewAction = true;
      this.buildActionForm(this.action);
    }

    if (changes.token) {
      this.buildDetails(this.token);
    }

    if(changes.statusResponse){
      if(changes.statusResponse.currentValue){
        console.log("status changes", changes.statusResponse.currentValue)
        this.isNewAction = false;

        if(this.statusResponse.scanUrl){
          this.SCAN_URL_FORM_ITEM.defaultValue = this.statusResponse.scanUrl
          this.formStructure[this.action].append(this.SCAN_URL_FORM_ITEM)
        }

        if(this.statusResponse.txHash){
          this.SCAN_URL_FORM_ITEM.defaultValue = this.statusResponse.txHash
          this.formStructure[this.action].append(this.TXHASH_URL_FORM_ITEM)
        }
      }
    }
  }

  buildActionForm(action: string){
    this.form = this.fb.group({});

    if (!this.formStructure[action]){
      return
    }

    this.formStructure[action].forEach(field => {
      const validators: ValidatorFn[] = [];
      if (field.required) {
        validators.push(Validators.required);
      }
      this.form.addControl(field.label, this.fb.control(field.defaultValue, validators));
    });

    this.form.valueChanges.subscribe((values) => {
      Object.keys(values).forEach((key) => {
        const field = this.formStructure[action].find((f) => f.label === key);
        if (field) {
          field.defaultValue = values[key];
        }
      });
    });
  }

  buildDetails(token: any){
    return Object.keys(token).map(key => {
      const index = this.tokenDetails.findIndex(detail => detail.name === key);
      if (index !== -1) {
        this.tokenDetails[index].value = token[key];
      }
    }).filter(obj => obj !== null);
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

  changeMode(){
    if (this.form.valid) {
      this.isEditMode = !this.isEditMode
    } else {
      Object.keys(this.form.controls).forEach(fieldName => {
        if (this.form.get(fieldName).errors && this.form.get(fieldName).errors.required) {
          this.makeFieldInvalid(fieldName);
        }
      });
    }
  }

  confirm(formStructure: any){
    if (this.form.valid) {
      this.actionForm.emit({tokenHashId: this.token.hashId, action: this.action, form: formStructure});
    } else {
      Object.keys(this.form.controls).forEach(fieldName => {
        if (this.form.get(fieldName).errors && this.form.get(fieldName).errors.required) {
          this.makeFieldInvalid(fieldName);
        }
      });
    }
  }

  refresh(hashId: string){
    this.refreshStatus.emit(hashId)
  }

  goToScan(){
    const url = this.token.scanUrl;
    window.open(url, '_blank');
  }

}
