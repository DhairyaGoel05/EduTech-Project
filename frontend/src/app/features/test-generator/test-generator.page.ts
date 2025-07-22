import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-test-generator',
  templateUrl: './test-generator.page.html',
  styleUrls: ['./test-generator.page.scss'],
})
export class TestGeneratorPage implements OnInit {
  isCreating = false;
  generationMode = 'ai';
  generatingQuestions = false;
  showQuestionEditor = false;
  editingQuestionIndex = -1;

  newTest = {
    title: '',
    description: '',
    timeLimit: 60,
    showAnswers: true,
    multipleAttempts: false,
    questions: [] as any[]
  };

  currentQuestion = {
    type: 'mcq',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    answer: ''
  };

  selectedPDF: any = null;
  questionCount = 10;
  questionTypes = ['mcq', 'short'];

  availablePDFs = [
    { id: 1, name: 'Mathematics - Calculus.pdf' },
    { id: 2, name: 'Physics - Mechanics.pdf' },
    { id: 3, name: 'Chemistry - Organic.pdf' }
  ];

  tests = [
    {
      id: 1,
      title: 'Calculus Fundamentals',
      description: 'Basic calculus concepts and applications',
      questions: [
        { question: 'What is the derivative of x²?', type: 'short', answer: '2x' }
      ],
      timeLimit: 45,
      showAnswers: true,
      attempts: 15,
      averageScore: 78
    },
    {
      id: 2,
      title: 'Physics Quiz',
      description: 'Newton\'s laws and motion',
      questions: [
        { question: 'State Newton\'s first law', type: 'essay', answer: 'An object at rest stays at rest...' }
      ],
      timeLimit: 30,
      showAnswers: false,
      attempts: 8,
      averageScore: 85
    }
  ];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    await this.loadTests();
  }

  async loadTests() {
    const savedTests = await this.storage.get('tests');
    if (savedTests) {
      this.tests = savedTests;
    }
  }

  async saveTests() {
    await this.storage.set('tests', this.tests);
  }

  createNewTest() {
    this.isCreating = true;
    this.resetNewTest();
  }

  resetNewTest() {
    this.newTest = {
      title: '',
      description: '',
      timeLimit: 60,
      showAnswers: true,
      multipleAttempts: false,
      questions: []
    };
    this.generationMode = 'ai';
  }

  onGenerationModeChange(event: any) {
    this.generationMode = event.detail.value;
  }

  async generateQuestions() {
    if (!this.selectedPDF) {
      this.showToast('Please select a PDF first', 'warning');
      return;
    }

    this.generatingQuestions = true;

    // Simulate AI question generation
    setTimeout(() => {
      const sampleQuestions = [
        {
          type: 'mcq',
          question: 'What is the main topic discussed in Chapter 1?',
          options: ['Introduction', 'Conclusion', 'References', 'Appendix'],
          correctAnswer: 0
        },
        {
          type: 'short',
          question: 'Explain the key concept mentioned on page 5.',
          answer: 'The key concept involves understanding the fundamental principles...'
        },
        {
          type: 'tf',
          question: 'The document mentions three main categories.',
          answer: true
        }
      ];

      this.newTest.questions = sampleQuestions.slice(0, this.questionCount);
      this.generatingQuestions = false;
      this.showToast('Questions generated successfully!', 'success');
    }, 3000);
  }

  addQuestion() {
    this.resetCurrentQuestion();
    this.editingQuestionIndex = -1;
    this.showQuestionEditor = true;
  }

  editQuestion(index: number) {
    this.currentQuestion = { ...this.newTest.questions[index] };
    this.editingQuestionIndex = index;
    this.showQuestionEditor = true;
  }

  removeQuestion(index: number) {
    this.newTest.questions.splice(index, 1);
  }

  resetCurrentQuestion() {
    this.currentQuestion = {
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      answer: ''
    };
  }

  onQuestionTypeChange() {
    if (this.currentQuestion.type === 'mcq' && this.currentQuestion.options.length === 0) {
      this.currentQuestion.options = ['', '', '', ''];
      this.currentQuestion.correctAnswer = 0;
    }
  }

  addOption() {
    if (this.currentQuestion.options.length < 6) {
      this.currentQuestion.options.push('');
    }
  }

  removeOption(index: number) {
    if (this.currentQuestion.options.length > 2) {
      this.currentQuestion.options.splice(index, 1);
      if (this.currentQuestion.correctAnswer >= this.currentQuestion.options.length) {
        this.currentQuestion.correctAnswer = 0;
      }
    }
  }

  isQuestionValid(): boolean {
    if (!this.currentQuestion.question.trim()) return false;

    switch (this.currentQuestion.type) {
      case 'mcq':
        return this.currentQuestion.options.every(opt => opt.trim()) && 
               this.currentQuestion.correctAnswer >= 0;
      case 'short':
      case 'essay':
        return this.currentQuestion.answer.trim() !== '';
      case 'tf':
        return this.currentQuestion.answer !== undefined;
      default:
        return false;
    }
  }

  saveQuestion() {
    if (!this.isQuestionValid()) return;

    if (this.editingQuestionIndex >= 0) {
      this.newTest.questions[this.editingQuestionIndex] = { ...this.currentQuestion };
    } else {
      this.newTest.questions.push({ ...this.currentQuestion });
    }

    this.closeQuestionEditor();
    this.showToast('Question saved!', 'success');
  }

  closeQuestionEditor() {
    this.showQuestionEditor = false;
    this.editingQuestionIndex = -1;
  }

  async saveTest() {
    if (!this.newTest.title.trim() || this.newTest.questions.length === 0) {
      this.showToast('Please provide a title and at least one question', 'warning');
      return;
    }

    const test = {
      ...this.newTest,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      attempts: 0,
      averageScore: 0
    };

    this.tests.unshift(test);
    await this.saveTests();
    
    this.isCreating = false;
    this.showToast('Test created successfully!', 'success');
  }

  cancelCreation() {
    this.isCreating = false;
  }

  viewTest(test: any) {
    // Navigate to test details/preview
    this.showToast(`Viewing test: ${test.title}`, 'primary');
  }

  editTest(test: any) {
    this.newTest = { ...test };
    this.isCreating = true;
  }

  duplicateTest(test: any) {
    const duplicated = {
      ...test,
      id: Date.now(),
      title: `${test.title} (Copy)`,
      createdAt: new Date().toISOString(),
      attempts: 0,
      averageScore: 0
    };
    
    this.tests.unshift(duplicated);
    this.saveTests();
    this.showToast('Test duplicated!', 'success');
  }

  async deleteTest(test: any) {
    const alert = await this.alertController.create({
      header: 'Delete Test',
      message: `Are you sure you want to delete "${test.title}"?`,
      buttons: [
        'Cancel',
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.tests = this.tests.filter(t => t.id !== test.id);
            this.saveTests();
            this.showToast('Test deleted', 'success');
          }
        }
      ]
    });

    await alert.present();
  }

  getQuestionTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'mcq': 'Multiple Choice',
      'short': 'Short Answer',
      'essay': 'Essay',
      'tf': 'True/False'
    };
    return labels[type] || type;
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