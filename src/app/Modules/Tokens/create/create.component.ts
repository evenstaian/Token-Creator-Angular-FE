import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { SharedDataService } from '../../../shared/shared-data.service';
import { Router } from '@angular/router';

import { STATUS } from 'criptolab-types';
import { SoundService } from 'src/services/sound/sound.service';
import { TokenTypeService } from 'src/app/shared/token-type.service';

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

  constructor(
    public tokenTypeService: TokenTypeService,
    private sharedDataService: SharedDataService, 
    private router: Router,
    private soundService: SoundService,
    private location: Location) { 

      this.location.subscribe((event) => {
        if (event.type = 'popstate') {
          this.sharedDataService.setData(null)
        }
      });
    }

  ngOnInit(): void {
  }

  onHover(tokenType: any): void {
    if(tokenType.status != STATUS.enabled){
      return
    }
    //this.soundService.playHoverSound(this.soundService.SoundTypes.SELECTION);
  }

  isLogged(){
    const authToken = localStorage.getItem('auth_token');
    return authToken;
  }

  openDetails(tokenType: any){
    if(!this.isLogged()){
      this.router.navigate(["/login"]);
      return
    }

    if(tokenType.status != STATUS.enabled){
      //this.soundService.playHoverSound(this.soundService.SoundTypes.ERROR);
      return
    }
    this.sharedDataService.setTokenType(tokenType);
    this.sharedDataService.setData(tokenType.bannerImageUrl);
    this.sharedDataService.setFormStructure(tokenType.form)
    this.router.navigate(['/create-token/details'])
  }

}
