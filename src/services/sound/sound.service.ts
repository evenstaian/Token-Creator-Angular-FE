import { Injectable } from '@angular/core';

@Injectable()
export class SoundService {

  private audio: HTMLAudioElement;
  public SoundTypes = {
    SELECTION: 'assets/sounds/gta-menu.wav',
    ERROR: 'assets/sounds/error.aac'
  }

  constructor() {
    this.audio = new Audio();
    this.audio.src = 'assets/sounds/beep-boop.aac';
  }

  playHoverSound(soundType: string): void {
    this.audio.src = soundType;
    this.audio.currentTime = 0;
    this.audio.play();
  }
}