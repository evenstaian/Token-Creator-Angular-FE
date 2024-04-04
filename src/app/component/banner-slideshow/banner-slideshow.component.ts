import { Component, OnInit } from '@angular/core';
//import { trigger, transition, style, animate } from '@angular/animations';
import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationEvent,
} from '@angular/animations';

const fade = [
  trigger('fade', [
    state('show', style({ opacity: '1' })),
    state('hide', style({ opacity: '0' })),
    transition('show => hide', animate('1s')),
    transition('hide => show', animate('1s')),
  ]),
];

const zoom = [
  trigger('zoom', [
    transition('hide => show', animate('7000ms', style({ transform: 'scale(1.2)', opacity: 1 }))),
  ]),
];

const SHOW = 'show';
const HIDE = 'hide';
const VOID = 'void';

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
    ]),
    fade,
    zoom
  ]
})

export class BannerSlideshowComponent implements OnInit {

  // images: string[] = [
  //   "assets/images/big/monas.jpeg",
  //   "assets/images/big/monkey_red.jpeg",
  //   "assets/images/big/isometric.jpeg",
  //   "assets/images/big/canudo.jpeg"
  // ];
  lastIndex = 0;
  currentIndex = 0;

  images = [
    {
      url: 'assets/images/big/monas.jpeg',
      state: HIDE,
    },
    {
      url: 'assets/images/big/monkey_red.jpeg',
      state: HIDE,
    },
    {
      url: 'assets/images/big/isometric.jpeg',
      state: HIDE,
    },
    {
      url: 'assets/images/big/canudo.jpeg',
      state: HIDE,
    }
  ];

  counter = 0;
  animating = false;
  stop = false;
  pauseTime = 1000; // time to show image before continuing animation (ms)

  // constructor() { }

  ngOnInit(): void {

    setTimeout(() => {
      if(this.images.length){
        this.images[0].state = SHOW;
      }
    }, 200);
    

    setInterval(() => {
      this.lastIndex = (this.currentIndex) % this.images.length;
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.showNext()
    }, 7000);
    this.stop = false;
  }

  get index() {
    return this.counter % this.images.length;
  }

  set index(value: number) {
    this.counter = value;
  }

  showNext() {
    if (this.stop) return (this.animating = false);
    this.images[this.lastIndex].state = HIDE;
    this.images[this.currentIndex].state = SHOW;
    console.log(this.images[this.currentIndex])
  }

  mouseover() {
    this.stop = false;
    if (this.animating) return;
    this.animating = true;
    this.showNext();
  }

  mouseout() {
    // Signal to stop at the end of an animation cycle
    this.stop = true;
  }

  onDone(event: AnimationEvent) {
    if (event.fromState === VOID) return;
    if (event.toState === HIDE)
      setTimeout(() => this.showNext(), this.pauseTime);
  }

}
