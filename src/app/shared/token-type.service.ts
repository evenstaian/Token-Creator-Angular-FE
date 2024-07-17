import { Injectable } from '@angular/core';
import { STATUS, TOKEN_STANDARD_TYPES } from 'criptolab-types';

interface TokenTypeModel {
    label: string;
    description: string;
    identifier: string;
    bannerImageUrl: string;
    type: string;
    form: any;
    status: string;
}

@Injectable({
    providedIn: 'root'
})
export class TokenTypeService {
    public ERC20_FORM = [
        {
            label: "classIdentifier",
            placeholder: "Tipo do seu token",
            type: "text",
            defaultValue: "",
            hide: true,
            required: false,
        },
        {
            label: "name",
            placeholder: "nome do seu token",
            type: "text",
            defaultValue: "",
            required: true,
            maxLength: 50,
        },
        {
            label: "symbol",
            placeholder: "qual o símbolo? ex: BTC",
            type: "text",
            defaultValue: "",
            required: true,
            maxLength: 10,
        },
        {
            label: "description",
            placeholder: "qual a descrição?",
            type: "textarea",
            defaultValue: "",
            required: true,
            maxLength: 5000,
        },
        {
            label: "quantity",
            placeholder: "qual é a quantidade emitida?",
            type: "text",
            defaultValue: "",
            required: true,
            mask: "separator.0",
            maxLength: 50,
        },
        {
            label: "company",
            placeholder: "qual é o nome da sua empresa?",
            type: "text",
            defaultValue: "",
            required: true,
            maxLength: 100,
        },
    ]

    public ERC721_FORM = [
        {
            label: "classIdentifier",
            placeholder: "Tipo do seu token",
            type: "text",
            defaultValue: "",
            hide: true,
            required: false,
        },
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

    public TokenTypes: TokenTypeModel[] = [
        {
            label: "Utility Token",
            description: "Ótimo para acessar produtos ou aplicações exclusivas",
            identifier: "UT",
            bannerImageUrl: "assets/images/big/bull.png",
            type: TOKEN_STANDARD_TYPES.ERC20,
            form: this.ERC20_FORM,
            status: STATUS.enabled,
        },
        {
            label: "Rewards Token",
            description: "Perfeito para programas de fidelidade descentralizados",
            identifier: "RT",
            bannerImageUrl: "assets/images/big/bull.png",
            type: TOKEN_STANDARD_TYPES.ERC721,
            form: this.ERC721_FORM,
            status: STATUS.enabled,
        },
        {
            label: "Payment Token",
            description: "Ideal para realizar pagamentos dentro de um ecossistema",
            identifier: "PT",
            bannerImageUrl: "assets/images/big/bull.png",
            type: TOKEN_STANDARD_TYPES.ERC20,
            form: this.ERC20_FORM,
            status: STATUS.enabled,
        },
        {
            label: "Fan/Sport Token",
            description: "Podem ser usados para aumentar o engajamento de fãs e torcedores",
            identifier: "FST",
            bannerImageUrl: "assets/images/big/basket.png",
            type: TOKEN_STANDARD_TYPES.ERC20,
            form: this.ERC20_FORM,
            status: STATUS.enabled,
        },
        {
            label: "Token RWA",
            description: "Vinculados a ativos reais, oferecendo segurança adicional",
            identifier: "TRWA",
            bannerImageUrl: "assets/images/big/bull.png",
            type: TOKEN_STANDARD_TYPES.ERC20,
            form: this.ERC20_FORM,
            status: STATUS.enabled,
        },
        {
            label: "ReFi",
            description: "Fantástico para finanças regenerativas, como créditos de carbono e reflorestamento",
            identifier: "RFI",
            bannerImageUrl: "assets/images/big/nature.png",
            type: TOKEN_STANDARD_TYPES.ERC20,
            form: this.ERC20_FORM,
            status: STATUS.enabled,
        },
        {
            label: "NFT Colecionáveis",
            description: "Incrível para criar e colecionar arte e itens exclusivos",
            identifier: "NFTC",
            bannerImageUrl: "",
            type: TOKEN_STANDARD_TYPES.ERC721,
            form: this.ERC721_FORM,
            status: STATUS.enabled,
        },
        {
            label: "DeFi",
            description: "Essencial para operações de finanças descentralizadas, como empréstimos e yield farming",
            identifier: "DFI",
            bannerImageUrl: "",
            type: TOKEN_STANDARD_TYPES.ERC721,
            form: this.ERC721_FORM,
            status: STATUS.soon,
        }
    ]

    constructor() { }

    formatTokenToTokenTypeObj(token: any) {
        if (!token.class_identifier) {
            return false;
        }
        const tokenType = this.TokenTypes.find(type => type.identifier === token.class_identifier);
        if (!tokenType) {
            return false;
        }
        console.log({ token, tokenType })

        Object.keys(token).map(key => {
            const index = tokenType.form.findIndex(form => form.label === key);
            if (index !== -1) {
                tokenType.form[index].defaultValue = token[key];
            }
        }).filter(obj => obj !== null);

        return tokenType;
    }

    getTokenTypeScheme(classIdentifier?: string) {
        if (classIdentifier) {
            const tokenType = this.TokenTypes.find(type => type.identifier === classIdentifier);
            if (!tokenType) {
                return false;
            }
            return tokenType;
        }

        return false;
    }
}