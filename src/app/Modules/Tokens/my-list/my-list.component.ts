import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  pageTitles = {
    title: "Seus tokens",
    subtitle: "Veja os tokens que você já criou"
  }

  myTokensList: any;

  ButtonsTypes = {
    MINT: {
      color: "#00A34B"
    },
    TRANSFER: {
      color: "#0780B4"
    },
    BURN: {
      color: "#810202"
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.getMyTokensList();
  }

  getMyTokensList(){
    this.myTokensList = [
      {
        token: {
          hashId: "asajajsajs",
          imgUrl: "assets/images/vectors/ic_token.svg",
          name: "AdidasToken",
          ticker: "ADS"
        },
        actions: [
          "MINT",
          "TRANSFER",
          "BURN"
        ]
      },
      {
        token: {
          hashId: "asajajsajs1212",
          imgUrl: "assets/images/vectors/ic_token.svg",
          name: "NikeToken",
          ticker: "NTK"
        },
        actions: [
          "MINT",
          "TRANSFER",
          "BURN"
        ]
      },
      {
        token: {
          hashId: "asajajsajs1212",
          imgUrl: "assets/images/vectors/ic_token.svg",
          name: "NikeToken",
          ticker: "NTK"
        },
        actions: [
          "MINT",
          "TRANSFER",
          "BURN"
        ]
      },
      {
        token: {
          hashId: "asajajsajs1212",
          imgUrl: "assets/images/vectors/ic_token.svg",
          name: "NikeToken",
          ticker: "NTK"
        },
        actions: [
          "MINT",
          "TRANSFER",
          "BURN"
        ]
      },
      {
        token: {
          hashId: "asajajsajs1212",
          imgUrl: "assets/images/vectors/ic_token.svg",
          name: "NikeToken",
          ticker: "NTK"
        },
        actions: [
          "MINT",
          "TRANSFER",
          "BURN"
        ]
      },
      {
        token: {
          hashId: "asajajsajs1212",
          imgUrl: "assets/images/vectors/ic_token.svg",
          name: "NikeToken",
          ticker: "NTK"
        },
        actions: [
          "MINT",
          "TRANSFER",
          "BURN"
        ]
      },
      {
        token: {
          hashId: "asajajsajs1212",
          imgUrl: "assets/images/vectors/ic_token.svg",
          name: "NikeToken",
          ticker: "NTK"
        },
        actions: [
          "MINT",
          "TRANSFER",
          "BURN"
        ]
      },
      {
        token: {
          hashId: "asajajsajs1212",
          imgUrl: "assets/images/vectors/ic_token.svg",
          name: "NikeToken",
          ticker: "NTK"
        },
        actions: [
          "MINT",
          "TRANSFER",
          "BURN"
        ]
      },
      {
        token: {
          hashId: "asajajsajs1212",
          imgUrl: "assets/images/vectors/ic_token.svg",
          name: "NikeToken",
          ticker: "NTK"
        },
        actions: [
          "MINT",
          "TRANSFER",
          "BURN"
        ]
      },
    ]
  }

}
