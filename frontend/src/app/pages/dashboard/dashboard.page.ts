import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  currentUser: any = null;
  currentDate = new Date();
  studyStreak = 5;
  testsCompleted = 12;

  stats = [
    { icon: 'document-text-outline', value: '8', label: 'PDFs Uploaded' },
    { icon: 'checkmark-circle-outline', value: '15', label: 'Tests Taken' },
    { icon: 'time-outline', value: '24h', label: 'Study Time' },
    { icon: 'trending-up-outline', value: '85%', label: 'Average Score' }
  ];

  features = [
    {
      title: 'PDF Viewer',
      description: 'Upload and analyze PDFs with AI',
      icon: 'document-text-outline',
      route: '/pdf-viewer'
    },
    {
      title: 'Test Generator',
      description: 'Create and take tests',
      icon: 'create-outline',
      route: '/test-generator'
    },
    {
      title: 'AI Chatbot',
      description: 'Ask questions about your documents',
      icon: 'chatbubbles-outline',
      route: '/chatbot'
    },
    {
      title: 'Video Recommendations',
      description: 'Get YouTube suggestions',
      icon: 'play-circle-outline',
      route: '/youtube-recommendations'
    }
  ];

  recentActivity = [
    {
      title: 'Uploaded Mathematics PDF',
      description: 'Calculus Chapter 5',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: 'document-outline'
    },
    {
      title: 'Completed Physics Test',
      description: 'Score: 92%',
      time: new Date(Date.now() - 5 * 60 * 60 * 1000),
      icon: 'checkmark-circle-outline'
    }
  ];

  constructor(
    private router: Router,
    private storage: Storage,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.currentUser = await this.storage.get('currentUser');
    
    if (!this.currentUser) {
      this.router.navigate(['/auth']);
      return;
    }

    this.updateStatsForUserType();
  }

  updateStatsForUserType() {
    if (this.currentUser?.userType === 'teacher') {
      this.stats = [
        { icon: 'people-outline', value: '45', label: 'Students' },
        { icon: 'create-outline', value: '23', label: 'Tests Created' },
        { icon: 'document-text-outline', value: '67', label: 'PDFs Analyzed' },
        { icon: 'analytics-outline', value: '88%', label: 'Avg Class Score' }
      ];
    }
  }

  navigateToFeature(route: string) {
    this.router.navigate([route]);
  }

  viewStudents() {
    // Navigate to students management page
    this.showToast('Students management feature coming soon!');
  }

  async logout() {
    await this.storage.remove('currentUser');
    this.router.navigate(['/landing']);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}