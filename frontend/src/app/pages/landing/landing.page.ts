import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit, AfterViewInit {
  @ViewChild('logoRef', { static: false }) logoRef!: ElementRef;
  @ViewChild('subtitleRef', { static: false }) subtitleRef!: ElementRef;
  @ViewChild('buttonsRef', { static: false }) buttonsRef!: ElementRef;
  @ViewChild('featuresRef', { static: false }) featuresRef!: ElementRef;
  @ViewChild('statsRef', { static: false }) statsRef!: ElementRef;
  @ViewChild('ctaRef', { static: false }) ctaRef!: ElementRef;

  features = [
    {
      icon: 'document-text-outline',
      title: 'AI PDF Analysis',
      description: 'Upload PDFs and get AI-powered summaries, questions, and interactive content'
    },
    {
      icon: 'chatbubbles-outline',
      title: 'Smart Chatbot',
      description: 'Ask questions about your documents and get instant, contextual answers'
    },
    {
      icon: 'create-outline',
      title: 'Test Generator',
      description: 'Automatically generate tests and quizzes from your study materials'
    },
    {
      icon: 'play-circle-outline',
      title: 'Video Recommendations',
      description: 'Get YouTube video suggestions based on your PDF content'
    },
    {
      icon: 'analytics-outline',
      title: 'Progress Tracking',
      description: 'Monitor your learning progress with detailed analytics and insights'
    },
    {
      icon: 'people-outline',
      title: 'Teacher-Student Link',
      description: 'Connect with teachers for guided learning and assessment'
    }
  ];

  stats = [
    { number: '10K+', label: 'Active Students' },
    { number: '500+', label: 'Teachers' },
    { number: '50K+', label: 'PDFs Analyzed' },
    { number: '95%', label: 'Success Rate' }
  ];

  constructor(private router: Router) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.initAnimations();
  }

  initAnimations() {
    // Hero animations
    const tl = gsap.timeline();
    
    tl.from(this.logoRef.nativeElement, {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: "bounce.out"
    })
    .from(this.subtitleRef.nativeElement, {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: "power2.out"
    }, "-=0.5")
    .from(this.buttonsRef.nativeElement.children, {
      duration: 0.6,
      y: 20,
      opacity: 0,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.3");

    // Features section animation
    gsap.from(this.featuresRef.nativeElement.querySelectorAll('.feature-card'), {
      scrollTrigger: {
        trigger: this.featuresRef.nativeElement,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: "power2.out"
    });

    // Stats section animation
    gsap.from(this.statsRef.nativeElement.querySelectorAll('.stat-item'), {
      scrollTrigger: {
        trigger: this.statsRef.nativeElement,
        start: "top 80%",
      },
      duration: 1,
      scale: 0.8,
      opacity: 0,
      stagger: 0.1,
      ease: "back.out(1.7)"
    });

    // CTA section animation
    gsap.from(this.ctaRef.nativeElement.children, {
      scrollTrigger: {
        trigger: this.ctaRef.nativeElement,
        start: "top 80%",
      },
      duration: 0.8,
      y: 30,
      opacity: 0,
      stagger: 0.2,
      ease: "power2.out"
    });
  }

  navigateToAuth(userType: string) {
    this.router.navigate(['/auth'], { queryParams: { type: userType } });
  }
}