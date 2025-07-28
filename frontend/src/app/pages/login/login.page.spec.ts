import { ComponentFixture, TestBed, async } from '@angular/core/testing'; // <-- Import 'async' here
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular'; // Import AuthModule for testing

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => { // Now 'async' will be recognized
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        // Mock the AuthModule configuration for testing
        AuthModule.forRoot({
          domain: 'mock-domain',
          clientId: 'mock-client-id'
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
