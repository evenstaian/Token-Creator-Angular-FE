import { Component, OnInit} from '@angular/core';
import { SharedDataService } from '../../../shared/shared-data.service';

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
      bannerImageUrl: "assets/images/big/nature.png",
      status: "ACTIVED"
    },
    {
      label: "Crédito de Carbono e ESG",
      bannerImageUrl: "",
      status: "ACTIVED"
    },
    {
      label: "Rewards/Cashback Token",
      bannerImageUrl: "",
      status: "SOON"
    }
  ]

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
  }

  openDetails(){
    this.sharedDataService.setData(this.TokenTypes[0].bannerImageUrl);
  }

}
