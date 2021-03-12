import { TestBed } from '@angular/core/testing';

import { RecaptchaService } from './recaptcha.service';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {RecaptchaModule} from 'ng-recaptcha';
import {MaterialModule} from '../material.module';

describe('RecaptchaService', () => {
  let service: RecaptchaService;

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
    service = TestBed.inject(RecaptchaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
