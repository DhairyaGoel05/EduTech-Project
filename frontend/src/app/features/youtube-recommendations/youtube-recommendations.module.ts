import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YoutubeRecommendationsPageRoutingModule } from './youtube-recommendations-routing.module';

import { YoutubeRecommendationsPage } from './youtube-recommendations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YoutubeRecommendationsPageRoutingModule
  ],
  declarations: [YoutubeRecommendationsPage]
})
export class YoutubeRecommendationsPageModule {}