import { TestBed } from '@angular/core/testing';

import { PredictService } from './predict.service';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {RecaptchaModule} from 'ng-recaptcha';
import {MaterialModule} from '../material.module';

describe('PredictService', () => {
  let service: PredictService;
  const object = [{
    gender : 0,
    ssc_p : 0,
    hsc_p: 0,
    degree_p : 0,
    workex : 0,
    etest_p : 0,
    specialisation: 0,
    mba_p: 0,
    dummy_Arts: 0,
    dummy_Commerce: 0,
    dummy_Science: 1,
    'dummy_Comm&Mgmt ' : 0,
    dummy_Others  : 0,
    'dummy_Sci&Tech': 1
  },
    {
      gender : 0,
      ssc_p : 100,
      hsc_p: 100,
      degree_p : 100,
      workex : 2,
      etest_p : 0,
      specialisation: 10,
      mba_p: 0,
      dummy_Arts: 1,
      dummy_Commerce: 0,
      dummy_Science: 0,
      'dummy_Comm&Mgmt ' : 1,
      dummy_Others  : 0,
      'dummy_Sci&Tech': 0
    }];

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
    service = TestBed.inject(PredictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('R1.2A', (done: DoneFn) => {
    service.get(object[0]).subscribe(value => {
      expect(value.body.prediction[1]).toBe('0');
      done();
    }, error => {
      expect(error.body.prediction[1]).toBe('0');
      done();
    });
  });

  it('R1.2B', (done: DoneFn) => {
    service.get(object[1]).subscribe(value => {
      expect(value.body.prediction[1]).toBe('1');
      done();
    }, error => {
      expect(error.body.prediction[1]).toBe('1');
      done();
    });
  });

});
