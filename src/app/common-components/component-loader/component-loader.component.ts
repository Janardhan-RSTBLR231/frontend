import { Component, NgZone, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'ngx-component-loader',
  templateUrl: './component-loader.component.html',
  styleUrls: ['./component-loader.component.scss'],
})
export class ComponentLoaderComponent implements OnInit {
  options;
  animationItem;
  autoPlay = true;
  width = '200px';
  height = '130px';
  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.options = {
      ...this.options,
      path: '../../../assets/animations/loader.json',
      loop: true,
      autoplay: this.autoPlay,
    };
  }

  ngOnChanges() {
    // if (this.activateAnimation) {
    this.start();
    // } else {
    //   this.stop();
    // }
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  start() {
    if (this.animationItem) {
      this.ngZone.runOutsideAngular(() => this.animationItem.play());
    }
  }

  stop() {
    if (this.animationItem && !this.autoPlay) {
      this.ngZone.runOutsideAngular(() => this.animationItem.stop());
    }
  }
}
