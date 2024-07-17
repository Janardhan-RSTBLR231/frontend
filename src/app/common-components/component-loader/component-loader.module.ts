import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentLoaderComponent } from './component-loader.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [ComponentLoaderComponent],
  imports: [CommonModule, LottieModule.forRoot({ player: playerFactory })],
  exports: [ComponentLoaderComponent],
})
export class ComponentLoaderModule {}
