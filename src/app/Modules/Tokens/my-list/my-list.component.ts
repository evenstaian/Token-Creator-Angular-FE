import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css'],
  providers: [
    AppService
  ]
})
export class MyListComponent implements OnInit {

  imagePlaceholder="assets/images/icons/ic_token_image.svg";

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

  loader: boolean = false;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getMyTokensList();
  }

  getMyTokensList(){
    this.showLoader(true);

    this.appService.getUserData().subscribe(data => {
      this.showLoader(false);
      const response: any = data;
      if(response.tokensQueued){
        this.myTokensList = response.tokensQueued;
      }
    }, 
    error => {
      this.showLoader(false);
    }) 
  }

  showLoader(status: boolean) {
    this.loader = status
  }

}
