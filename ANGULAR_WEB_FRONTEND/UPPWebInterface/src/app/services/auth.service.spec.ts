import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {RecaptchaModule} from 'ng-recaptcha';
import {MaterialModule} from '../material.module';
import {environment} from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  const testSuite = [{email: 'wrong@user.com', password: 'wrong-password'},
    {email: 'test@test.com', password: environment.password}];
  const existingUser = {
    email: 'user1@gmail.com',
    password: 'user10702',
    roles: 'admin',
    name: 'user1'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        RecaptchaModule,
        MaterialModule,
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('R2.A', (done: DoneFn) => {
    service.login(testSuite[0]).subscribe(value => {
      expect(value.error.message).toBe('Auth failed');
      done();
    }, error => {
      expect(error.error.message).toBe('Auth failed');
      done();
    });
  });

  it('R2.B', (done: DoneFn) => {
    service.login(testSuite[1]).subscribe(value => {
      expect(value.message).toBe('Auth successful');
      done();
    }, error => {
      expect(error.message).toBe('Auth successful');
      done();
    });
  });

  it('R2.1.A', (done: DoneFn) => {
    service.signup(existingUser).subscribe(value => {
      console.log(value)
      expect(value.error.message).toBe('Mail exists');
      done();
    }, error => {
      console.log(error)
      expect(error.error.message).toBe('Mail exists');
      done();
    });
  });
});
