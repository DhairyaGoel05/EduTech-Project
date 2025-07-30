import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'callback',
    redirectTo: 'dashboard'
  },
  {
    path: 'pdf-viewer',
    loadChildren: () => import('./features/pdf-viewer/pdf-viewer.module').then(m => m.PdfViewerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'test-generator',
    loadChildren: () => import('./features/test-generator/test-generator.module').then(m => m.TestGeneratorPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'chatbot',
    loadChildren: () => import('./features/chatbot/chatbot.module').then(m => m.ChatbotPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'youtube-recommendations',
    loadChildren: () => import('./features/youtube-recommendations/youtube-recommendations.module').then(m => m.YoutubeRecommendationsPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
