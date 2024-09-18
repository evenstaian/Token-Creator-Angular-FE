import { Injectable } from '@angular/core';

export interface Product {
    id: number;
    title: string;
    subtitle: string;
    price: string;
    priceNumber: number;
    checkoutUrl: string;
    button: { title: string, class: string };
    featuresList: string[];
}

@Injectable({
    providedIn: 'root'
})
export class PlansTypeService {
    public products: Product[] = [
        {
            id: 1,
            title: "Rookie",
            subtitle: "Para provas de conceito e protótipos em TestNet",
            price: "Grátis",
            priceNumber: 0,
            checkoutUrl: "",
            button: {
                title: "Continuar Usando",
                class: "btn-secondary",
            },
            featuresList: [
                "Até 10 emissões de tokens em qualquer TestNet",
                "Quantidade ilimitada de tokens ERC-20 na mintagem inicial em Testnet",
                "Até 1000 transferências de tokens por mês em Testnet",
                "Até 100 novas mintagens ou queimas por mês em Testnet",
                "Publicação de uma página pública de token (com aviso TESTNET)"
            ]
        },
        {
            id: 2,
            title: "Startup",
            subtitle: "Para projetos de tokenização em fase de lançamento",
            price: "R$ 199,00/m",
            priceNumber: 199.00,
            checkoutUrl: "",
            button: {
                title: "Comece Agora",
                class: "btn-primary",
            },
            featuresList: [
                "Tudo do plano Rookie e mais:",
                "Até 10 emissões de tokens ERC-20 em qualquer MainNet",
                "Quantidade ilimitada de tokens ERC-20 na mintagem inicial em MainNet",
                "Até 50 tokens NFT com imagens ou gifs animados e cópias ilimitadas",
                "Até R$ 100,00 de bônus para deploys e transferências em MainNet",
                "Publicação de até 5 páginas públicas de tokens",
            ]
        },
        {
            id: 3,
            title: "Enterprise",
            subtitle: "Para empresas e startups escalando projetos de tokenização",
            price: "R$ 499,00/m",
            priceNumber: 499.00,
            checkoutUrl: "",
            button: {
                title: "Comece Agora",
                class: "btn-primary",
            },
            featuresList: [
                "Tudo do plano Startup e mais:",
                "Até 50 emissões de tokens ERC-20 em qualquer MainNet",
                "Até 200 tokens NFT com imagens ou gifs animados e cópias ilimitadas",
                "Até R$ 300,00 de bônus para deploys e transferências em MainNet",
                "Atendimento 24x7 com especialista em tokenização e Web3",
                "3 sessões de consultoria jurídica com escritório parceiro especializado em Web3",
            ]
        }
    ]
}