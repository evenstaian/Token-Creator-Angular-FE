import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  tokenActions = {
    MINT: "MINT",
    TRANSFER: "TRANSFER",
    BURN: "BURN",
    OFFER: "OFFER",
    SELL: "SELL",
    BUY: "BUY"
  }

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

  erc20Actions = [
    this.tokenActions.MINT,
    this.tokenActions.BURN
  ]

  getMyTokensList(){


    // //Criacao com os outro parametros


    // import { ImageModule, Types, ImagesProviders } from 'image-module';

    // const imageResponse = await imageModule.create(data, Types.TokenImage, ImagesProviders.S3, imageName);

    // imageResponse.url

    // mongoDb -> update -> imgUrl


    this.myTokensList = [
      {
        token: {
          hashId: "asajajsajs",
          imgUrl: "assets/images/vectors/ic_token.svg",
          name: "AdidasToken",
          ticker: "ADS",
          type: "ERC-20",
          mintedQuantity: "",
          burnedQuantity: "",
          created_at: "2024-04-08T00:00:00",
        },
        actions: this.erc20Actions
      },
      {
        token: {
          hashId: "asajajsajs1212",
          imgUrl: "assets/images/vectors/ic_token.svg",
          name: "NikeToken",
          ticker: "NTK",
          type: "ERC-20",
          mintedQuantity: "",
          burnedQuantity: "",
          created_at: "2024-04-08T00:00:00",
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
          ticker: "NTK",
          type: "ERC-20",
          mintedQuantity: "",
          burnedQuantity: "",
          created_at: "2024-04-08T00:00:00",
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
