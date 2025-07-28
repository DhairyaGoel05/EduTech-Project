import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLogin = false;
  userType = 'student';
  isLoading = false;

  // This object is correctly initialized with empty strings.
  formData = {
    email: '',
    password: '',
    fullName: '',
    phone: '',
    grade: '',
    institution: '',
    subjects: '',
    experience: '',
    teachingSubjects: '',
    qualification: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    
    // Get user type from query params
    this.route.queryParams.subscribe(params => {
      if (params['type']) {
        this.userType = params['type'];
      }
    });
  }

  onUserTypeChange(event: any) {
    this.userType = event.detail.value;
  }

  toggleAuthMode() {
    this.isLogin = !this.isLogin;
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      email: '',
      password: '',
      fullName: '',
      phone: '',
      grade: '',
      institution: '',
      subjects: '',
      experience: '',
      teachingSubjects: '',
      qualification: ''
    };
  }

  async onSubmit() {
    this.isLoading = true;

    try {
      if (this.isLogin) {
        await this.login();
      } else {
        await this.signup();
      }
    } catch (error) {
      console.error('Auth error:', error);
      this.showToast('Authentication failed. Please try again.', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async login() {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user exists in storage
    const users = await this.storage.get('users') || [];
    const user = users.find((u: any) => u.email === this.formData.email);

    if (user && user.password === this.formData.password) {
      await this.storage.set('currentUser', user);
      this.showToast('Login successful!', 'success');
      this.router.navigate(['/dashboard']);
    } else {
      this.showToast('Invalid credentials', 'danger');
    }
  }

  async signup() {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const userData = {
      ...this.formData,
      userType: this.userType,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    // Save to storage
    const users = await this.storage.get('users') || [];
    users.push(userData);
    await this.storage.set('users', users);
    await this.storage.set('currentUser', userData);

    this.showToast('Account created successfully!', 'success');
    this.router.navigate(['/dashboard']);
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    toast.present();
  }
}
