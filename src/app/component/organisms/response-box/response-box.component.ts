import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-response-box',
  templateUrl: './response-box.component.html',
  styleUrls: ['./response-box.component.css']
})
export class ResponseBoxComponent implements OnInit {
  @Input() config = {
    type: 'error',
    title: 'Tt',
    subtitle: 'Tt'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
