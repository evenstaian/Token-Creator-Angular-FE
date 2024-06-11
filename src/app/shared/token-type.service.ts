import { Injectable } from '@angular/core';
import { STATUS, TOKEN_STANDARD_TYPES } from 'criptolab-types';

@Injectable({
    providedIn: 'root'
})
export class TokenTypeService {
    public ERC20_FORM = [
        {
            label: "name",
            placeholder: "nome do seu token",
            type: "text",
            defaultValue: "",
            required: true,
        },
        {
            label: "symbol",
            placeholder: "qual o símbolo? ex: BTC",
            type: "text",
            defaultValue: "",
            required: true,
        },
        {
            label: "description",
            placeholder: "qual a descrição?",
            type: "textarea",
            defaultValue: "",
            required: true,
        },
        {
            label: "quantity",
            placeholder: "qual é a quantidade emitida?",
            type: "number",
            defaultValue: "",
            required: true,
        },
        {
            label: "company",
            placeholder: "qual é o nome da sua empresa?",
            type: "text",
            defaultValue: "",
            required: true,
        },
    ]

    public ERC721_FORM = [
        {
            label: "name",
            placeholder: "nome do seu token",
            type: "text",
            defaultValue: "",
            required: true,
        },
        {
            label: "symbol",
            placeholder: "qual o símbolo? ex: BTC",
            type: "text",
            defaultValue: "",
            required: true,
        },
        {
            label: "description",
            placeholder: "qual a descrição?",
            type: "textarea",
            defaultValue: "",
            required: true,
        },
        {
            label: "company",
            placeholder: "qual é o nome da sua empresa?",
            type: "text",
            defaultValue: "",
            required: true,
        },
    ]

    public TokenTypes = [
        {
            label: "Fan/Sport Token",
            identifier: "FST",
            bannerImageUrl: "assets/images/big/basket.png",
            type: TOKEN_STANDARD_TYPES.ERC20,
            form: this.ERC20_FORM,
            status: STATUS.enabled,
        },
        {
            label: "Crédito de Carbono e ESG",
            identifier: "CCESG",
            bannerImageUrl: "assets/images/big/nature.png",
            type: TOKEN_STANDARD_TYPES.ERC20,
            form: this.ERC20_FORM,
            status: STATUS.enabled,
        },
        {
            label: "Utility Token",
            identifier: "UT",
            bannerImageUrl: "assets/images/big/bull.png",
            type: TOKEN_STANDARD_TYPES.ERC20,
            form: this.ERC20_FORM,
            status: STATUS.enabled,
        },
        {
            label: "Rewards/Cashback Token",
            identifier: "RCT",
            bannerImageUrl: "",
            type: TOKEN_STANDARD_TYPES.ERC20,
            form: this.ERC20_FORM,
            status: STATUS.soon,
        },
        {
            label: "NFT Colecionáveis",
            identifier: "NFTC",
            bannerImageUrl: "",
            type: TOKEN_STANDARD_TYPES.ERC20,
            form: this.ERC721_FORM,
            status: STATUS.enabled,
        },
        {
            label: "Rewards/Cashback Token",
            identifier: "NFT Badges / Prêmios",
            bannerImageUrl: "NFTBP",
            type: TOKEN_STANDARD_TYPES.ERC20,
            form: this.ERC20_FORM,
            status: STATUS.soon,
        },
        {
            label: "NFT Arte / Música",
            identifier: "NFTAM",
            bannerImageUrl: "",
            type: TOKEN_STANDARD_TYPES.ERC20,
            form: this.ERC20_FORM,
            status: STATUS.soon,
        }
    ]

    constructor() { }
}