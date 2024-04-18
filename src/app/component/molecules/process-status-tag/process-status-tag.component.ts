import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-process-status-tag',
  templateUrl: './process-status-tag.component.html',
  styleUrls: ['./process-status-tag.component.css']
})
export class ProcessStatusTagComponent implements OnChanges {

  @Input() processStatus: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes.processStatus){
      console.log({processStatus: this.processStatus})
    }
  }

}
