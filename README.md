# TokenizaBrasil.gov - Angular Project

Este é um projeto Angular desenvolvido para criar uma interface **Governo -> Rede DREX**, este projeto permite uma integração com a Web3 e controle de Acesso de funcionários do governo no acesso das carteiras permissionadas no Hyperledger Besu da RSFN.
Para testes, não há ainda implementada uma camada de Authentication, pois consideramos que esta não é uma entrega prioritária para o Hackathon. Focamos no serviço cerne nesta PoC. Mas isto não significa que está fora de nosso Roadmap para proximas entregas.

## Como Rodar Localmente
Certifique-se de ter o Node.js e o npm instalados em sua máquina. Clone este repositório e, em seguida, execute os seguintes comandos:

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
ng serve
```
Abra seu navegador em http://localhost:4200/ para visualizar o aplicativo.

## Criação de Build
Para criar uma versão de produção, execute:

```bash
ng build --prod
```
Os arquivos de build estarão no diretório dist/prod.

## Implantação no Google App Engine
Este projeto inclui um arquivo _app.yaml_ configurado para implantação no Google App Engine usando o Google Cloud Platform (GCP). Certifique-se de ter a CLI do GCP instalada e autenticada.

Para implantar no App Engine, execute:

```bash
gcloud app deploy
```
Siga as instruções para confirmar a implantação.

Agora você está pronto para começar a trabalhar e testar este projeto Angular. Seja produtivo e aproveite!
