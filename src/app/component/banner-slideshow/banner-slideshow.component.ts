import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-banner-slideshow',
  templateUrl: './banner-slideshow.component.html',
  styleUrls: ['./banner-slideshow.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('zoomInOut', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('500ms', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ transform: 'scale(0.5)', opacity: 0 }))
      ])
    ])
  ]
})
export class BannerSlideshowComponent implements OnInit {

  images: string[] = [
    "assets/images/big/monas.jpeg",
    "assets/images/big/monkey_red.jpeg",
    "assets/images/big/isometric.jpeg",
    "assets/images/big/canudo.jpeg"
  ];
  currentIndex = 0;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 7000);
  }

}
