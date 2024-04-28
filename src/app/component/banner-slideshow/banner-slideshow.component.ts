import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationEvent,
} from '@angular/animations';
import { SharedDataService } from 'src/app/shared/shared-data.service';

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
    state('show', style({ transform: 'scale(1.2)' })),
    transition('hide => show', animate('7000ms', style({ transform: 'scale(1.2)', opacity: 1 }))),
  ]),
];

const singleZoom = [
  trigger('singleZoom', [
    state('show', style({ transform: 'scale(1.2)' })),
    transition('hide => show', animate('2000ms ease-in-out', style({ transform: 'scale(1.2)', opacity: 1 }))),
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
    fade,
    zoom,
    singleZoom
  ]
})

export class BannerSlideshowComponent implements OnInit {

  lastIndex = 0;
  currentIndex = 0;

  images = [
    {
      url: 'assets/images/big/white-monkey.png',
      state: HIDE,
    },
    {
      url: 'assets/images/big/vangogh.png',
      state: HIDE,
    },
    {
      url: 'assets/images/big/woman.png',
      state: HIDE,
    },
    {
      url: 'assets/images/big/monkey-yellow.png',
      state: HIDE,
    },
    {
      url: 'assets/images/big/isometric.jpeg',
      state: HIDE,
    },
    {
      url: 'assets/images/big/realist.png',
      state: HIDE,
    },
    {
      url: 'assets/images/big/bear.png',
      state: HIDE,
    },
    {
      url: 'assets/images/big/astronaut.png',
      state: HIDE,
    },
    {
      url: 'assets/images/big/greece.png',
      state: HIDE,
    },
    {
      url: 'assets/images/big/canudo.jpeg',
      state: HIDE,
    },
    {
      url: 'assets/images/big/mona-cyber.png',
      state: HIDE,
    },
  ];

  counter = 0;
  animating = false;
  stop = false;
  pauseTime = 1000;

  singleImageUrl: any = {
    state: SHOW,
  };

  constructor(private sharedDataService: SharedDataService){
    this.sharedDataService.bannerDetailsImageUrl.subscribe(data => {
      this.singleImageUrl = {
        url: data,
        state: HIDE,
      }

      setTimeout(() => {
        this.singleImageUrl.state = SHOW;
      }, 200);
    });
  }

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
