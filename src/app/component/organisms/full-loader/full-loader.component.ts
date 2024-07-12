import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-full-loader',
  templateUrl: './full-loader.component.html',
  styleUrls: ['./full-loader.component.css']
})
export class FullLoaderComponent implements OnChanges {

  @Input() isLoading: boolean = false;
  @Input() loaderJson: string = "infinity_loader.json";

  constructor() {
   }

   ngOnChanges(changes: SimpleChanges) {}

}
