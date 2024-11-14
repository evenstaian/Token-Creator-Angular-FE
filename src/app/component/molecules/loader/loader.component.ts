import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnChanges {

  @Input() loaderJson: string = "rocket_loader.json"

  constructor() { }

  options: AnimationOptions = {
    path: `/assets/animations/${this.loaderJson}`
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loaderJson && changes.loaderJson.currentValue) {
      this.options = {
        path: `/assets/animations/${changes.loaderJson.currentValue}`
      };
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    //console.log(animationItem);
  }

}
