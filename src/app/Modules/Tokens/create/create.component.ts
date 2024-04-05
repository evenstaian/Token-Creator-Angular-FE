import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  pageTitles = {
    title: "Crie seu próprio token",
    subtitle: "Que tipo de token você deseja criar? "
  }

  TokenTypes = [
    {
      label: "Fan/Sport Token",
      status: "ACTIVED"
    },
    {
      label: "Crédito de Carbono e ESG",
      status: "ACTIVED"
    },
    {
      label: "Rewards/Cashback Token",
      status: "SOON"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
