import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'pdf-viewer',
    loadChildren: () => import('./features/pdf-viewer/pdf-viewer.module').then(m => m.PdfViewerPageModule)
  },
  {
    path: 'test-generator',
    loadChildren: () => import('./features/test-generator/test-generator.module').then(m => m.TestGeneratorPageModule)
  },
  {
    path: 'chatbot',
    loadChildren: () => import('./features/chatbot/chatbot.module').then(m => m.ChatbotPageModule)
  },
  {
    path: 'youtube-recommendations',
    loadChildren: () => import('./features/youtube-recommendations/youtube-recommendations.module').then(m => m.YoutubeRecommendationsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}