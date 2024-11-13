import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  @ViewChild('backgroundVideo') backgroundVideo!: ElementRef;
  videoStarted = false;

  ngAfterViewInit() {
    this.loadAndPlayVideo();
  }

  private loadAndPlayVideo() {
    const video: HTMLVideoElement = this.backgroundVideo.nativeElement;

    video.muted = true;
    video.loop = true;

    video.play().then(() => {
      this.videoStarted = true;
    }).catch();
  }

}
