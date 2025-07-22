import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YoutubeRecommendationsPage } from './youtube-recommendations.page';

const routes: Routes = [
  {
    path: '',
    component: YoutubeRecommendationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubeRecommendationsPageRoutingModule {}