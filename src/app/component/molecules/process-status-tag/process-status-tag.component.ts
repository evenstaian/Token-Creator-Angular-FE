import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-process-status-tag',
  templateUrl: './process-status-tag.component.html',
  styleUrls: ['./process-status-tag.component.css']
})
export class ProcessStatusTagComponent implements OnInit {

  @Input() processStatus: string;

  showRefreshIcon: boolean = false;
  waitToRefreshIntervalMs = 15000;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showRefreshIcon = true
    }, this.waitToRefreshIntervalMs);
  }

}
