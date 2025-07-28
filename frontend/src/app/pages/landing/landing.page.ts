import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-landing',
    templateUrl: './landing.page.html',
    styleUrls: ['./landing.page.scss'],
    standalone: false
})
export class LandingPage implements OnInit, AfterViewInit {
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  @ViewChild('logoRef', { static: false }) logoRef!: ElementRef;
  @ViewChild('subtitleRef', { static: false }) subtitleRef!: ElementRef;
  @ViewChild('buttonsRef', { static: false }) buttonsRef!: ElementRef;
  @ViewChild('featuresRef', { static: false }) featuresRef!: ElementRef;
  @ViewChild('statsRef', { static: false }) statsRef!: ElementRef;
  @ViewChild('ctaRef', { static: false }) ctaRef!: ElementRef;

  features = [
    { icon: 'document-text-outline', title: 'AI PDF Analysis', description: 'Upload PDFs and get AI-powered summaries, questions, and interactive content' },
    { icon: 'chatbubbles-outline', title: 'Smart Chatbot', description: 'Ask questions about your documents and get instant, contextual answers' },
    { icon: 'create-outline', title: 'Test Generator', description: 'Automatically generate tests and quizzes from your study materials' },
    { icon: 'play-circle-outline', title: 'Video Recommendations', description: 'Get YouTube video suggestions based on your PDF content' },
    { icon: 'analytics-outline', title: 'Progress Tracking', description: 'Monitor your learning progress with detailed analytics and insights' },
    { icon: 'people-outline', title: 'Teacher-Student Link', description: 'Connect with teachers for guided learning and assessment' },
    { icon: 'easel-outline', title: 'Collaborative Whiteboard', description: 'Brainstorm and solve problems with peers in a shared real-time canvas.' }
  ];

  stats = [
    { number: '10K+', label: 'Active Students' },
    { number: '500+', label: 'Teachers' },
    { number: '50K+', label: 'PDFs Analyzed' },
    { number: '95%', label: 'Success Rate' }
  ];

  constructor(private router: Router) { }

  ngOnInit() {}

  async ngAfterViewInit() {
    if (!this.content) {
      console.error('IonContent is not available.');
      return;
    }
    const scrollEl = await this.content.getScrollElement();
    
    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        if (arguments.length) {
          scrollEl.scrollTop = value as number;
        }
        return scrollEl.scrollTop;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      }
    });

    this.initAnimations(scrollEl);
  }

  initAnimations(scroller: any) {
    if (!this.logoRef || !this.subtitleRef || !this.buttonsRef || !this.featuresRef || !this.statsRef || !this.ctaRef) {
        console.error('One or more animated elements are not available.');
        return;
    }

    gsap.timeline()
      .from(this.logoRef.nativeElement, { duration: 1, y: -50, opacity: 0, ease: "bounce.out" })
      .from(this.subtitleRef.nativeElement, { duration: 0.8, y: 30, opacity: 0, ease: "power2.out" }, "-=0.5")
      .from(this.buttonsRef.nativeElement.children, { duration: 0.6, y: 20, opacity: 0, stagger: 0.2, ease: "power2.out" }, "-=0.3");

    // CORRECTED: Added a timeout to ensure all feature cards are rendered before the animation runs.
    // This prevents the first card from being missed by the animation.
    setTimeout(() => {
        gsap.from(this.featuresRef.nativeElement.querySelectorAll('.feature-card'), {
        scrollTrigger: {
            trigger: this.featuresRef.nativeElement,
            scroller: scroller,
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
    }, 100);

    gsap.from(this.statsRef.nativeElement.querySelectorAll('.stat-item'), {
      scrollTrigger: {
        trigger: this.statsRef.nativeElement,
        scroller: scroller,
        start: "top 80%",
      },
      duration: 1,
      scale: 0.8,
      opacity: 0,
      stagger: 0.1,
      ease: "back.out(1.7)"
    });

    gsap.from(this.ctaRef.nativeElement.children, {
      scrollTrigger: {
        trigger: this.ctaRef.nativeElement,
        scroller: scroller,
        start: "top 80%",
      },
      duration: 0.8,
      y: 30,
      opacity: 0,
      stagger: 0.2,
      ease: "power2.out"
    });
  }

  // CORRECTED: This function now navigates to the '/login' page as requested.
  navigateToAuth(role: string) {
    this.router.navigate(['/login'], { queryParams: { role: role } });
  }
}
