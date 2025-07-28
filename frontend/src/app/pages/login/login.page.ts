import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userTypeSelection: 'student' | 'teacher' | null = null;

  // Injected ActivatedRoute to read URL parameters.
  constructor(
    public auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // This code runs when the page loads.
    // It checks the URL for a 'role' parameter.
    this.route.queryParams
      .pipe(filter(params => params['role']))
      .subscribe(params => {
        const role = params['role'];
        if (role === 'student' || role === 'teacher') {
          // If a valid role is found, it pre-selects the correct card.
          this.selectUserType(role);
        }
      });
  }

  // This function is called when a user clicks on a role card.
  selectUserType(role: 'student' | 'teacher') {
    this.userTypeSelection = role;
  }

  // CORRECTED: This function now passes the selected role to Auth0.
  // This allows you to use the role information later (e.g., in Auth0 Actions).
  login(role: string): void {
    this.auth.loginWithRedirect({
      appState: { 
        target: '/dashboard',
        // We can also store the role here if needed within the app after login.
        role: role 
      },
      authorizationParams: {
        screen_hint: 'signup',
        // This passes the role as a custom parameter to the Auth0 Universal Login page.
        'ext-role': role 
      }
    });
  }
}
