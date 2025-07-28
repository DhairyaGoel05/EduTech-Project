import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Clipboard } from '@capacitor/clipboard';

@Component({
    selector: 'app-chatbot',
    templateUrl: './chatbot.page.html',
    styleUrls: ['./chatbot.page.scss'],
    standalone: false
})
export class ChatbotPage implements OnInit, AfterViewChecked {
  @ViewChild('chatContainer', { static: false }) chatContainer!: ElementRef;

  selectedPDF: any = null;
  currentMessage = '';
  isTyping = false;
  shouldScrollToBottom = false;

  availablePDFs = [
    {
      id: 1,
      name: 'Mathematics - Calculus Fundamentals.pdf',
      pages: 45,
      uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 2,
      name: 'Physics - Quantum Mechanics.pdf',
      pages: 78,
      uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: 3,
      name: 'Chemistry - Organic Compounds.pdf',
      pages: 32,
      uploadDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ];

  messages: any[] = [];

  quickQuestions = [
    'What is the main topic of this document?',
    'Can you summarize the key points?',
    'What are the important formulas mentioned?',
    'Explain the concepts in simple terms'
  ];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Initialize with welcome message when PDF is selected
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  selectPDF(pdf: any) {
    this.selectedPDF = pdf;
    this.initializeChat();
  }

  changePDF() {
    this.selectedPDF = null;
    this.messages = [];
  }

  initializeChat() {
    this.messages = [
      {
        type: 'ai',
        content: `Hello! I'm ready to help you with questions about "${this.selectedPDF.name}". What would you like to know?`,
        timestamp: new Date(),
        liked: false
      }
    ];
    this.shouldScrollToBottom = true;
  }

  askQuickQuestion(question: string) {
    this.currentMessage = question;
    this.sendMessage();
  }

  // THIS IS THE CORRECTED LINE
  handleEnterKey(event: any) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  async sendMessage() {
    if (!this.currentMessage.trim() || this.isTyping) return;

    const userMessage = {
      type: 'user',
      content: this.currentMessage.trim(),
      timestamp: new Date()
    };

    this.messages.push(userMessage);
    const question = this.currentMessage;
    this.currentMessage = '';
    this.isTyping = true;
    this.shouldScrollToBottom = true;

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = this.generateAIResponse(question);
      this.messages.push(aiResponse);
      this.isTyping = false;
      this.shouldScrollToBottom = true;
    }, 1500 + Math.random() * 1000);
  }

  generateAIResponse(question: string): any {
    const responses = [
      `Based on the content in "${this.selectedPDF.name}", I can help explain that concept. The document discusses this topic in detail on several pages.`,
      `According to the PDF, this is covered in Chapter 2. The key points include several important aspects that are fundamental to understanding the subject.`,
      `The document provides comprehensive coverage of this topic. Let me break down the main concepts for you based on what's written in the PDF.`,
      `This is an excellent question about the material in "${this.selectedPDF.name}". The document explains this concept with examples and detailed explanations.`,
      `From my analysis of the PDF content, this topic is thoroughly discussed with practical applications and theoretical foundations.`
    ];

    return {
      type: 'ai',
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
      liked: false
    };
  }

  async copyMessage(content: string) {
    try {
      await Clipboard.write({
        string: content
      });
      this.showToast('Message copied to clipboard', 'success');
    } catch (error) {
      // Fallback for web
      navigator.clipboard.writeText(content).then(() => {
        this.showToast('Message copied to clipboard', 'success');
      }).catch(() => {
        this.showToast('Failed to copy message', 'danger');
      });
    }
  }

  likeMessage(message: any) {
    message.liked = !message.liked;
    const action = message.liked ? 'liked' : 'unliked';
    this.showToast(`Message ${action}`, 'primary');
  }

  async clearChat() {
    const alert = await this.alertController.create({
      header: 'Clear Chat',
      message: 'Are you sure you want to clear all messages?',
      buttons: [
        'Cancel',
        {
          text: 'Clear',
          role: 'destructive',
          handler: () => {
            this.messages = [];
            this.initializeChat();
            this.showToast('Chat cleared', 'success');
          }
        }
      ]
    });

    await alert.present();
  }

  scrollToBottom() {
    if (this.chatContainer) {
      setTimeout(() => {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }, 100);
    }
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
