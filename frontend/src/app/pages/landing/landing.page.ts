import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// This is the corrected component definition.
// It is no longer 'standalone' and will work with your modules.
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements AfterViewInit {
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  @ViewChild('logoRef', { static: false }) logoRef!: ElementRef;
  @ViewChild('subtitleRef', { static: false }) subtitleRef!: ElementRef;
  @ViewChild('buttonsRef', { static: false }) buttonsRef!: ElementRef;
  @ViewChild('featuresRef', { static: false }) featuresRef!: ElementRef;
  @ViewChild('statsRef', { static: false }) statsRef!: ElementRef;
  @ViewChild('ctaRef', { static: false }) ctaRef!: ElementRef;

  features = [
    {
      icon: 'book-outline',
      title: 'Smart Study Material',
      description: 'Get AI-curated notes and resources tailored to your syllabus.',
    },
    {
      icon: 'chatbubbles-outline',
      title: 'Doubt Solving',
      description: 'Instant answers to all your study questions with our AI tutor.',
    },
    {
      icon: 'create-outline',
      title: 'Test Generator',
      description: 'Generate custom tests to prepare effectively.',
    },
    {
      icon: 'bar-chart-outline',
      title: 'Performance Analysis',
      description: 'Track your progress with detailed performance insights.',
    },
  ];

  stats = [
    { number: '10K+', label: 'Students' },
    { number: '1K+', label: 'Teachers' },
    { number: '500+', label: 'Courses' },
    { number: '100%', label: 'AI Powered' },
  ];

  constructor(private router: Router) {}

  navigateToAuth(role: string) {
    this.router.navigate(['/login'], { queryParams: { role } });
  }

  async ngAfterViewInit() {
    // Your animation logic can be added back here if needed
  }

  initAnimations(scroller: HTMLElement) {
    // Your animation logic can be added back here if needed
  }
}
