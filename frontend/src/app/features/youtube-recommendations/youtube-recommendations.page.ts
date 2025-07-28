import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';

@Component({
    selector: 'app-youtube-recommendations',
    templateUrl: './youtube-recommendations.page.html',
    styleUrls: ['./youtube-recommendations.page.scss'],
    standalone: false
})
export class YoutubeRecommendationsPage implements OnInit {
  selectedPDFId: number = 1;
  isLoading = false;
  showVideoPlayer = false;
  currentVideo: any = null;

  availablePDFs = [
    { id: 1, name: 'Mathematics - Calculus Fundamentals.pdf', shortName: 'Calculus' },
    { id: 2, name: 'Physics - Quantum Mechanics.pdf', shortName: 'Physics' },
    { id: 3, name: 'Chemistry - Organic Compounds.pdf', shortName: 'Chemistry' }
  ];

  recommendations = [
    {
      id: 1,
      title: 'Calculus Explained: Derivatives and Integrals',
      channel: 'Khan Academy',
      thumbnail: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '15:42',
      views: '2.3M',
      uploadDate: '2 years ago',
      relevanceScore: 5,
      description: 'A comprehensive introduction to calculus concepts including derivatives and integrals.',
      url: 'https://youtube.com/watch?v=example1',
      saved: false
    },
    {
      id: 2,
      title: 'Understanding Limits in Calculus',
      channel: 'Professor Leonard',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '28:15',
      views: '1.8M',
      uploadDate: '1 year ago',
      relevanceScore: 4,
      description: 'Deep dive into the concept of limits and their applications in calculus.',
      url: 'https://youtube.com/watch?v=example2',
      saved: false
    },
    {
      id: 3,
      title: 'Chain Rule Made Simple',
      channel: 'Organic Chemistry Tutor',
      thumbnail: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '12:30',
      views: '956K',
      uploadDate: '8 months ago',
      relevanceScore: 4,
      description: 'Learn the chain rule for derivatives with step-by-step examples.',
      url: 'https://youtube.com/watch?v=example3',
      saved: false
    },
    {
      id: 4,
      title: 'Integration Techniques',
      channel: 'PatrickJMT',
      thumbnail: 'https://images.pexels.com/photos/6238302/pexels-photo-6238302.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '22:18',
      views: '1.2M',
      uploadDate: '3 years ago',
      relevanceScore: 5,
      description: 'Master various integration techniques including substitution and integration by parts.',
      url: 'https://youtube.com/watch?v=example4',
      saved: false
    }
  ];

  savedVideos: any[] = [];

  constructor(private toastController: ToastController) {}

  ngOnInit() {
    this.loadRecommendations();
  }

  onPDFChange(event: any) {
    this.selectedPDFId = event.detail.value;
    this.loadRecommendations();
  }

  getSelectedPDF() {
    return this.availablePDFs.find(pdf => pdf.id === this.selectedPDFId);
  }

  async loadRecommendations() {
    this.isLoading = true;
    
    // Simulate API call to get recommendations based on PDF content
    setTimeout(() => {
      // Update recommendations based on selected PDF
      this.updateRecommendationsForPDF();
      this.isLoading = false;
    }, 2000);
  }

  updateRecommendationsForPDF() {
    const pdfSpecificRecommendations: { [key: number]: any[] } = {
      1: [ // Calculus
        {
          id: 1,
          title: 'Calculus Explained: Derivatives and Integrals',
          channel: 'Khan Academy',
          thumbnail: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=400',
          duration: '15:42',
          views: '2.3M',
          uploadDate: '2 years ago',
          relevanceScore: 5,
          description: 'A comprehensive introduction to calculus concepts including derivatives and integrals.',
          url: 'https://youtube.com/watch?v=example1',
          saved: false
        },
        {
          id: 2,
          title: 'Understanding Limits in Calculus',
          channel: 'Professor Leonard',
          thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
          duration: '28:15',
          views: '1.8M',
          uploadDate: '1 year ago',
          relevanceScore: 4,
          description: 'Deep dive into the concept of limits and their applications in calculus.',
          url: 'https://youtube.com/watch?v=example2',
          saved: false
        }
      ],
      2: [ // Physics
        {
          id: 5,
          title: 'Quantum Mechanics Fundamentals',
          channel: 'MinutePhysics',
          thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
          duration: '18:25',
          views: '3.1M',
          uploadDate: '1 year ago',
          relevanceScore: 5,
          description: 'Introduction to quantum mechanics principles and wave functions.',
          url: 'https://youtube.com/watch?v=example5',
          saved: false
        },
        {
          id: 6,
          title: 'Schrödinger Equation Explained',
          channel: 'Physics Explained',
          thumbnail: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
          duration: '24:12',
          views: '1.5M',
          uploadDate: '6 months ago',
          relevanceScore: 4,
          description: 'Understanding the Schrödinger equation and its applications.',
          url: 'https://youtube.com/watch?v=example6',
          saved: false
        }
      ],
      3: [ // Chemistry
        {
          id: 7,
          title: 'Organic Chemistry Reactions',
          channel: 'Crash Course',
          thumbnail: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=400',
          duration: '16:33',
          views: '2.8M',
          uploadDate: '2 years ago',
          relevanceScore: 5,
          description: 'Overview of major organic chemistry reactions and mechanisms.',
          url: 'https://youtube.com/watch?v=example7',
          saved: false
        },
        {
          id: 8,
          title: 'Understanding Molecular Structure',
          channel: 'Chemistry Tutor',
          thumbnail: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400',
          duration: '21:45',
          views: '987K',
          uploadDate: '4 months ago',
          relevanceScore: 4,
          description: 'Learn about molecular structure and bonding in organic compounds.',
          url: 'https://youtube.com/watch?v=example8',
          saved: false
        }
      ]
    };

    this.recommendations = pdfSpecificRecommendations[this.selectedPDFId] || [];
  }

  refreshRecommendations() {
    this.loadRecommendations();
    this.showToast('Refreshing recommendations...', 'primary');
  }

  playVideo(video: any) {
    this.currentVideo = video;
    this.showVideoPlayer = true;
  }

  closeVideoPlayer() {
    this.showVideoPlayer = false;
    this.currentVideo = null;
  }

  async openExternalVideo() {
    if (this.currentVideo?.url) {
      await Browser.open({ url: this.currentVideo.url });
    }
  }

  saveVideo(video: any) {
    video.saved = !video.saved;
    
    if (video.saved) {
      const savedVideo = { ...video, savedDate: new Date() };
      this.savedVideos.push(savedVideo);
      this.showToast('Video saved!', 'success');
    } else {
      this.savedVideos = this.savedVideos.filter(v => v.id !== video.id);
      this.showToast('Video removed from saved', 'primary');
    }
  }

  removeSavedVideo(video: any) {
    this.savedVideos = this.savedVideos.filter(v => v.id !== video.id);
    // Update the original video's saved status
    const originalVideo = this.recommendations.find(v => v.id === video.id);
    if (originalVideo) {
      originalVideo.saved = false;
    }
    this.showToast('Video removed from saved', 'primary');
  }

  async shareVideo(video: any) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: `Check out this video: ${video.title}`,
          url: video.url
        });
      } catch (error) {
        this.fallbackShare(video);
      }
    } else {
      this.fallbackShare(video);
    }
  }

  fallbackShare(video: any) {
    // Fallback sharing method
    if (navigator.clipboard) {
      navigator.clipboard.writeText(video.url);
      this.showToast('Video link copied to clipboard', 'success');
    } else {
      this.showToast('Sharing not supported', 'warning');
    }
  }

  getStars(score: number): number[] {
    return Array(Math.floor(score)).fill(0);
  }

  getEmptyStars(score: number): number[] {
    return Array(5 - Math.floor(score)).fill(0);
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
  }
}