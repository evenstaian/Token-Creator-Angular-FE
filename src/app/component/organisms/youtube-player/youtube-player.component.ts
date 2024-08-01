import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css']
})
export class YoutubePlayerComponent implements OnInit {

  @ViewChild('videoContainer', { static: true }) videoContainer!: ElementRef;

  videoUrl: string = "https://www.youtube.com/embed/gNHSKhph99g?enablejsapi=1";

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const iframe = this.videoContainer.nativeElement.querySelector('iframe');
          const videoSrc = iframe.src;

          if (entry.isIntersecting) {
            iframe.src = `${this.videoUrl}&autoplay=0`;
          } else {
            iframe.src = videoSrc.replace('&autoplay=0', '');
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(this.videoContainer.nativeElement);
  }

}
