import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  // This will hold the user profile information from Auth0.
  currentUser: any = null;
  currentDate = new Date();
  studyStreak = 5;
  testsCompleted = 12;

  // Default stats for a student.
  stats = [
    { icon: 'document-text-outline', value: '8', label: 'PDFs Uploaded' },
    { icon: 'checkmark-circle-outline', value: '15', label: 'Tests Taken' },
    { icon: 'time-outline', value: '24h', label: 'Study Time' },
    { icon: 'trending-up-outline', value: '85%', label: 'Average Score' }
  ];

  features = [
    { title: 'PDF Viewer', description: 'Upload and analyze PDFs with AI', icon: 'document-text-outline', route: '/pdf-viewer' },
    { title: 'Test Generator', description: 'Create and take tests', icon: 'create-outline', route: '/test-generator' },
    { title: 'AI Chatbot', description: 'Ask questions about your documents', icon: 'chatbubbles-outline', route: '/chatbot' },
    { title: 'Video Recommendations', description: 'Get YouTube suggestions', icon: 'play-circle-outline', route: '/youtube-recommendations' }
  ];

  recentActivity = [
    { title: 'Uploaded Mathematics PDF', description: 'Calculus Chapter 5', time: new Date(Date.now() - 2 * 60 * 60 * 1000), icon: 'document-outline' },
    { title: 'Completed Physics Test', description: 'Score: 92%', time: new Date(Date.now() - 5 * 60 * 60 * 1000), icon: 'checkmark-circle-outline' }
  ];

  constructor(
    private router: Router,
    public auth: AuthService, // Injected Auth0 service
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit() {
    // Subscribe to the user$ observable to get profile information.
    this.auth.user$.subscribe(profile => {
      if (profile) {
        // NOTE: The role must be set up as a custom claim in your Auth0 Actions.
        // For example, using a namespace like 'https://edulink.com/roles'.
        const userRole = profile['https://edulink.com/roles']?.[0];

        this.currentUser = {
          fullName: profile.name,
          userType: userRole || 'student', // Default to 'student' if no role is found
          institution: profile['https://edulink.com/institution'] || 'EduLink University'
        };
        this.updateStatsForUserType();
      }
    });
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
    // Placeholder for future functionality
    console.log('Navigating to student management page...');
  }

  // CORRECTED: This now uses the official Auth0 logout method.
  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin
      }
    });
  }
}
