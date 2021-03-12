import {TestBed} from '@angular/core/testing';

import {QuizService} from './quiz.service';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {RecaptchaModule} from 'ng-recaptcha';
import {MaterialModule} from '../material.module';

describe('QuizService', () => {
  let service: QuizService;

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
    service = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('R4A', (done: DoneFn) => {
    service.getQuestion('Login and Reasoning').subscribe(value => {
      expect(value.subject).toBe('Login and Reasoning');
      done();
    }, error => {
      expect(error.subject).toBe('Login and Reasoning');
      done();
    });
  });

  it('R4A', (done: DoneFn) => {
    service.getQuestion('Login and Reasoning').subscribe(value => {
      expect(value.subject).toBe('Login and Reasoning');
      done();
    }, error => {
      expect(error.subject).toBe('Login and Reasoning');
      done();
    });
  });

  it('R4B', (done: DoneFn) => {
    service.getQuestion('Language').subscribe(value => {
      expect(value.subject).toBe('Language');
      done();
    }, error => {
      expect(error.subject).toBe('Language');
      done();
    });
  });

  it('R4C', (done: DoneFn) => {
    service.getQuestion('Coding').subscribe(value => {
      expect(value.subject).toBe('Coding');
      done();
    }, error => {
      expect(error.subject).toBe('Coding');
      done();
    });
  });

  it('R4D', (done: DoneFn) => {
    service.getQuestion('CS fundamental').subscribe(value => {
      expect(value.subject).toBe('CS fundamental');
      done();
    }, error => {
      expect(error.subject).toBe('CS fundamental');
      done();
    });
  });

  it('R4E', (done: DoneFn) => {
    service.getQuestion('Wrong').subscribe(value => {
      expect(value).toBe(null);
      done();
    }, error => {
      expect(error).toBe(null);
      done();
    });
  });
});
