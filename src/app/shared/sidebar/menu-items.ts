import { RouteInfo } from './sidebar.metadata';

var dados_conta: any = JSON.parse(localStorage.getItem('dados_conta') || '{}')
var privilegios = dados_conta.privilegies

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'DASHBOARD',
    icon: 'mdi mdi-gauge',
    class: '',
    extralink: false,
    show: privilegios != undefined ? privilegios.m_dashboard : 0,
    submenu: []
  },
  {
    path: '/usuarios',
    title: 'USUÁRIOS',
    icon: 'mdi mdi-account',
    class: '',
    extralink: false,
    show: privilegios != undefined ? privilegios.m_dashboard : 0,
    submenu: []
  },
  {
    path: '/depositos',
    title: 'DEPÓSITOS',
    icon: 'mdi mdi-briefcase-download',
    class: '',
    extralink: false,
    show: privilegios != undefined ? privilegios.m_deposits : 0,
    submenu: [{
      path: '/boleto',
      title: 'Boleto',
      icon: 'mdi mdi-briefcase-download',
      class: '',
      extralink: false,
      show: privilegios != undefined ? privilegios.m_deposits : 0,
      submenu: []
    }, {
      path: '/transferencia-bancaria',
      title: 'Transferência Bancária',
      icon: 'mdi mdi-briefcase-download',
      class: '',
      extralink: false,
      show: privilegios != undefined ? privilegios.m_deposits : 0,
      submenu: []
    }]
  },
  {
    path: '/pagamentos',
    title: 'PAGAMENTOS',
    icon: 'mdi mdi-cash-multiple',
    class: '',
    extralink: false,
    show: privilegios != undefined ? privilegios.m_payments : 0,
    submenu: [{
      path: '/boletos-recarga-voucher',
      title: 'Boletos, recargas, voucher',
      icon: 'mdi mdi-briefcase-download',
      class: '',
      extralink: false,
      show: privilegios != undefined ? privilegios.m_payments : 0,
      submenu: []
    }, {
      path: '/p2p-qrcode',
      title: 'P2P e QRCode',
      icon: 'mdi mdi-briefcase-download',
      class: '',
      extralink: false,
      show: privilegios != undefined ? privilegios.m_payments : 0,
      submenu: []
    }]
  },
  {
    path: '/retiradas',
    title: 'RETIRADAS',
    icon: 'mdi mdi-briefcase-upload',
    class: '',
    extralink: false,
    show: privilegios != undefined ? privilegios.m_cashout : 0,
    submenu: []
  },
  {
    path: '/cryptos',
    title: 'CRYPTOS',
    icon: 'mdi mdi-cash-multiple',
    class: '',
    extralink: false,
    show: privilegios != undefined ? privilegios.m_cashout : 0,
    submenu: [{
      path: '/cryptos-transactions',
      title: 'Transações Cryptos',
      icon: 'mdi mdi-briefcase-download',
      class: '',
      extralink: false,
      show: privilegios != undefined ? privilegios.m_cashout : 0,
      submenu: []
    }]
  },
  {
    path: '/suporte',
    title: 'SUPORTE',
    icon: 'mdi mdi-message-bulleted',
    class: '',
    extralink: false,
    show: privilegios != undefined ? privilegios.m_help : 0,
    submenu: [{
      path: '/kyc',
      title: 'KYC',
      icon: 'mdi mdi-briefcase-download',
      class: '',
      extralink: false,
      show: privilegios != undefined ? privilegios.m_help : 0,
      submenu: []
    }, {
      path: '/cases',
      title: 'Cases',
      icon: 'mdi mdi-briefcase-download',
      class: '',
      extralink: false,
      show: privilegios != undefined ? privilegios.m_help : 0,
      submenu: []
    }]
  }
];
