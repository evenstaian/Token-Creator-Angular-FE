import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TOKEN_STANDARD_TYPES } from 'criptolab-types';

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

  imageLabels = { 
    title: "Arraste e solte uma imagem aqui ou clique aqui para selecionar uma imagem. ", 
    subtitle: "(tamanho máximo: 1080px)"
  }

  imageFile: File;

  form: FormGroup;

  isEditMode: boolean = true;
  isNewAction: boolean = true; 

  QUANTITY_FORM_ITEM = {
    label: "quantity",
    placeholder: "qual a quantidade?",
    type: "number",
    defaultValue: "",
    required: true,
    hide: false,
  }

  ADDRESS_TO_FORM_ITEM = {
    label: "address_to",
    placeholder: "para qual endereço? (deixe vazio se não houver um destino ainda)",
    type: "text",
    defaultValue: "",
    required: false,
  }

  IMAGE_FORM_ITEM = {
    label: "image",
    placeholder: "Qual imagem você gostaria de mintar?",
    type: "file",
    defaultValue: "",
    required: false,
    hide: false,
  }

  SCAN_URL_FORM_ITEM = {
    label: "scan_url",
    placeholder: "Veja na scan",
    defaultValue: "",
  }

  TXHASH_URL_FORM_ITEM = {
    label: "tx_hash",
    placeholder: "Endereço na blockchain",
    defaultValue: "",
  }

  MINT_FORM = [
    this.IMAGE_FORM_ITEM,
    this.QUANTITY_FORM_ITEM,
    this.ADDRESS_TO_FORM_ITEM,
  ]

  TRANSFER_ADDRESS_TO_FORM_ITEM = () => {
    let FORM = { ...this.ADDRESS_TO_FORM_ITEM };
    FORM.placeholder = "para qual endereço?"
    FORM.required = true
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
    },
  ]

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.action) {
      this.isEditMode = true;
      this.isNewAction = true;
      this.buildActionForm(this.action);
      this.form.reset();
    }

    if (changes.token) {
      this.buildDetails(this.token);
      if(this.token.type == TOKEN_STANDARD_TYPES.ERC20){
        this.IMAGE_FORM_ITEM.hide = true
      }
      if(this.token.type == TOKEN_STANDARD_TYPES.ERC721){
        this.QUANTITY_FORM_ITEM.hide = true
      }
      this.buildActionForm(this.action);
    }

    if(changes.statusResponse){
      if(changes.statusResponse.currentValue){
        this.isNewAction = false;

        if(this.statusResponse[this.action].txHash){
          this.TXHASH_URL_FORM_ITEM.defaultValue = this.statusResponse[this.action].txHash
          this.formStructure[this.action].push(this.TXHASH_URL_FORM_ITEM)
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
      console.log(field.required, field.hide)
      const validators: ValidatorFn[] = [];
      if (field.required && !field.hide) {
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
      this.actionForm.emit({tokenHashId: this.token.hashId, standard: this.token.type, action: this.action, form: formStructure, file: this.imageFile});
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

  setImageFile(file: File){
    this.imageFile = file;
  }

  goToScan(scanUrl?: string){
    const url = scanUrl || this.token.scanUrl;
    window.open(url, '_blank');
  }

}