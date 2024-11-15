import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NETWORK_TYPES, TOKEN_ACTIONS_TYPES, TOKEN_STANDARD_TYPES } from 'criptolab-types';
import { TokenTypeService } from 'src/app/shared/token-type.service';
import { AppService } from 'src/services/app.service';
import { ethAddressValidator } from 'src/utils/Validators/validators';

@Component({
  selector: 'app-token-actions',
  templateUrl: './token-actions.component.html',
  styleUrls: ['./token-actions.component.css']
})
export class TokenActionsComponent implements OnChanges {

  statusResponseScheme: any = {
    MINT: "PENDING",
    TRANSFER: "PENDING",
    BURN: "PENDING",
  };

  @Input() action: string;
  @Input() token: any;
  @Input() statusResponse: any = {
    ...this.statusResponseScheme 
  };
  @Output() actionForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() refreshStatus: EventEmitter<any> = new EventEmitter<any>();
  @Output() cloneToMainnet: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('formDirective') formDirective: NgForm;

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
    type: "text",
    defaultValue: "",
    required: true,
    hide: false,
    mask: "separator.0",
  }

  ADDRESS_TO_FORM_ITEM = {
    label: "address_to",
    placeholder: "para qual endereço? (deixe vazio se não houver um destino ainda)",
    type: "text",
    defaultValue: "",
    required: false,
    validators: [ ethAddressValidator ],
    errorMessage: "Se preenchido, o endereço deve começar com '0x' seguido por 40 caracteres hexadecimais."
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

  TOKEN_ITEM_ID_FORM_ITEM = {
    label: "tokenItemId",
    placeholder: "Item escolhido",
    hide: true,
    required: false,
    defaultValue: "",
  }

  TOKEN_ITEM_NAME_FORM_ITEM = {
    label: "tokenItemName",
    placeholder: "Nome do Item",
    type: "text",
    required: true,
    defaultValue: "",
    hide: false,
  }

  MINT_FORM = [
    this.IMAGE_FORM_ITEM,
    this.TOKEN_ITEM_NAME_FORM_ITEM,
    this.QUANTITY_FORM_ITEM,
    this.ADDRESS_TO_FORM_ITEM,
  ]

  TRANSFER_ADDRESS_TO_FORM_ITEM = () => {
    let FORM = { ...this.ADDRESS_TO_FORM_ITEM };
    FORM.placeholder = "para qual endereço?"
    FORM.required = true
    FORM.errorMessage = "Endereço Ethereum inválido. Deve começar com '0x' seguido por 40 caracteres hexadecimais."
    return FORM
  }

  TRANSFER_FORM = [
    this.QUANTITY_FORM_ITEM,
    this.TRANSFER_ADDRESS_TO_FORM_ITEM(),
    this.TOKEN_ITEM_ID_FORM_ITEM,
  ]

  BURN_FORM = [
    this.QUANTITY_FORM_ITEM,
    this.TOKEN_ITEM_ID_FORM_ITEM,
  ]

  formStructure: any = {
    MINT: this.MINT_FORM,
    TRANSFER: this.TRANSFER_FORM,
    BURN: this.BURN_FORM,
  }

  formResponse: any;

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
      name: "classIdentifier",
      label: "A classe do seu token",
      value: ""
    },
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
    {
      name: "network",
      label: "Rede do Token",
      value: ""
    },
  ]

  items: any = [];
  selectedItem: any = [];

  itemsErrorMessage: string = "Buscando items..."

  constructor(
    private fb: FormBuilder, 
    private appService: AppService,
    private tokenTypeService: TokenTypeService,
    private router: Router) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.action) {
      this.isEditMode = true;
      this.isNewAction = true;
      this.buildActionForm(this.action);
      this.reset(this.action);

      if(this.action != TOKEN_ACTIONS_TYPES.MINT && this.token.type == TOKEN_STANDARD_TYPES.ERC721){
        this.getMyTokenItems(this.token.hashId)
        this.QUANTITY_FORM_ITEM.required = false;
      }
    }

    if (changes.token) {
      console.log("TOKEN", this.token)
      this.buildDetails(this.token);
      if(this.token.type == TOKEN_STANDARD_TYPES.ERC20){
        this.IMAGE_FORM_ITEM.hide = true
        this.TOKEN_ITEM_NAME_FORM_ITEM.hide = true
      }
      if(this.token.type == TOKEN_STANDARD_TYPES.ERC721){
        this.QUANTITY_FORM_ITEM.hide = true
      }
      this.buildActionForm(this.action);
    }

    if(changes.statusResponse){
      if(changes.statusResponse.currentValue){
        this.isNewAction = false;

        console.log({formResponse: this.formResponse})

        if(!this.formResponse && this.statusResponse[this.action].txHash){
          this.formResponse = [ ...this.formStructure[this.action] ];
          console.log(this.formResponse);
          const txHash = this.TXHASH_URL_FORM_ITEM;
          txHash.defaultValue = this.statusResponse[this.action].txHash;
          this.formResponse.push(txHash);
        }
      }
    }
  }

  getMyTokenItems(tokenHashId){
    this.items = null;
    this.itemsErrorMessage = "Buscando itens..."
    this.appService.getMyTokenItems(tokenHashId).subscribe(
      data => {
        this.items = data;
      }, 
      error => {
        this.itemsErrorMessage = error
      })
  }

  buildActionForm(action: string){
    this.form = this.fb.group({});

    if (!this.formStructure[action]){
      return
    }

    this.formStructure[action].forEach(field => {
      const validators: ValidatorFn[] = [];
      if (field.required && !field.hide) {
        validators.push(Validators.required);
      }
      if (field.validators) {
        validators.push(...field.validators);
      }
      this.form.addControl(field.label, this.fb.control(field.defaultValue, validators));
    });

    this.form.valueChanges.subscribe((values) => {
      Object.keys(values).forEach((key) => {
        const field = this.formStructure[action].find((f) => f.label === key);
        if (field) {
          if(!field.hide){
            field.defaultValue = values[key];
          }
        }
      });
    });
  }

  buildDetails(token: any){
    return Object.keys(token).map(key => {
      const classIdentifierIndex = this.tokenDetails.findIndex(detail => detail.name === "classIdentifier");
      const index = this.tokenDetails.findIndex(detail => detail.name === key);
      
      if (index !== -1) {
        this.tokenDetails[index].value = token[key];
      }

      if (classIdentifierIndex !== -1) {
        const tokenTypeScheme = this.tokenTypeService.getTokenTypeScheme(token.raw.class_identifier);
        this.tokenDetails[classIdentifierIndex].value =  tokenTypeScheme ? tokenTypeScheme.label : "";
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
    if(this.action != TOKEN_ACTIONS_TYPES.MINT && this.token.type == TOKEN_STANDARD_TYPES.ERC721){
      if(!this.selectedItem[0]){
        return
      }
    }

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

  setSelectedCollectionItem(item: any){
    this.selectedItem = []
    this.selectedItem.push(item)

    for(let index in this.formStructure[this.action]){
      if(this.formStructure[this.action][index].label == "tokenItemId"){
        this.formStructure[this.action][index].defaultValue = this.selectedItem[0].itemId;
      }
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

  reset(action: string){
    this.form.reset();
    if (this.formDirective) {
      this.formDirective.resetForm();
    }
    this.buildActionForm(action)
    this.items = null
    this.selectedItem = []
    this.isEditMode = true;
    this.isNewAction = true;
    this.formResponse = null;
    this.statusResponse = {
      ...this.statusResponseScheme 
    };
  }

  setImageFile(file: File){
    this.imageFile = file;
    this.previewImage(file)
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedItem = [
      {
        imageUrl: reader.result
      }
    ]
    };
    reader.readAsDataURL(file);
  }

  getNetwork(network: string){
    return NETWORK_TYPES[network]
  }

  goToScan(scanUrl?: string){
    const url = scanUrl || this.token.scanUrl;
    window.open(url, '_blank');
  }

  goToPublicPage(){
    this.token.address
    window.open(`/token/${this.token.address}`, '_blank');
  }

  goToDeployOnMainNet(){
    this.cloneToMainnet.emit(this.token);
  }

  showForm(){
    switch (this.token.type) {
      case TOKEN_STANDARD_TYPES.ERC721:
        if(this.action != TOKEN_ACTIONS_TYPES.MINT && !this.items){
          return false
        }
        return true
      case TOKEN_STANDARD_TYPES.ERC20:
          return true
      default:
        return false
    }
  }

}