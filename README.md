# CriptoLab Tokenizer - Angular Project

## Como Rodar Localmente

### Configurações necessárias:
- NodeJs 14
- Python 2.7

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
