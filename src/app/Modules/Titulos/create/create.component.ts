import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Requests } from 'src/services/requests.services';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public formBondTitle: FormGroup = new FormGroup({
    'bondName': new FormControl(null),
    'acronym': new FormControl(null),
    'maturityDate': new FormControl(null),
    'rentability': new FormControl(null),
    'amountTPFt': new FormControl(null)
  });

  public formBondPricing: FormGroup = new FormGroup({
    'price': new FormControl(null),
  });

  public showResponse: boolean = false;
  public showCreateLoader: boolean = false;
  public showPricingLoader: boolean = false;

  public transactionCreationObj : any;
  public transactionPricingObj : any;
  public responseMessage = {
    type: 'success',
    title: '',
    subtitle: ''
  }

  constructor( private requests: Requests ) { }

  ngOnInit(): void {
  }

  createBond(){
    this.showResponse = false;
    this.showCreateLoader = true;
    this.transactionCreationObj = null;


    if(!this.formBondTitle.value.maturityDate){
      this.setupResponseMessage(false, 'Data de Vencimento é obrigatório', 'Informe este Dado')
      return
    }

    const date = this.formBondTitle.value.maturityDate;
    var maturityDate = new Date(date.year, date.month - 1, date.day).toISOString().slice(0, -1);;

    const bondData = {
      bondName: this.formBondTitle.value.bondName,
      acronym: this.formBondTitle.value.acronym,
      maturityDate,
      rentability: this.formBondTitle.value.rentability,
      amountTPFt: this.formBondTitle.value.amountTPFt
    }

    const request = this.requests.createBond(bondData)

    request.subscribe(res => {
      console.log(res)
      if(!res){
        this.setupResponseMessage(false, 'Erro!', "Ocorreu um erro")
        return
      }

      const response: any = res;
      if(!response.txHash){
        this.setupResponseMessage(false, 'Erro!', response)
        return
      }

      this.transactionCreationObj = response;

      console.log({transaction: this.transactionCreationObj})
      this.showCreateLoader = false;
      this.showResponse = true;
      this.setupResponseMessage(true, 'Transação efetuada com sucesso na rede!', "")
    },
    error => {
      console.log(error)
      this.setupResponseMessage(false, 'Erro!', error.error.error)
    })
  }

  listToSellBond(){
    this.showResponse = false;
    this.showPricingLoader = true;
    this.transactionPricingObj = null;


    if(!this.formBondTitle.value.bondName){
      this.setupResponseMessage(false, 'Data de Vencimento é obrigatório', 'Informe este Dado')
      return
    }

    const price = `${this.formBondPricing.value.price}`;

    const pricingData = {
      tokenId: `${this.transactionCreationObj.tokenId}`,
      quantity: this.formBondTitle.value.amountTPFt,
      price
    }

    const request = this.requests.pricingBond(pricingData)

    request.subscribe(res => {
      if(!res){
        this.setupResponseMessage(false, 'Erro!', "")
        return
      }

      const response: any = res;
      if(!response.txHash){
        this.setupResponseMessage(false, 'Erro!', response)
        return
      }

      this.transactionPricingObj = response;
      this.showPricingLoader = false;
      this.showResponse = true;

      this.setupResponseMessage(true, 'Transação efetuada com sucesso na rede!', "")
    },
    error => {
      console.log(error)
      this.setupResponseMessage(false, 'Erro!', error.error.error)
    })
  }

  setupResponseMessage(status: boolean, title: string, subtitle: string) {
    this.showCreateLoader = false;
    this.showPricingLoader = false;
    this.showResponse = true;
    this.responseMessage = {
      type: status ? 'success' : 'error',
      title: title,
      subtitle: subtitle
    }
  }

  goToEtherscan(txHash: string){
    var anchor = document.createElement('a');
        anchor.href = `https://sepolia.etherscan.io/tx/${txHash}`;
        anchor.target = '_blank';
        anchor.click();
  }

}
