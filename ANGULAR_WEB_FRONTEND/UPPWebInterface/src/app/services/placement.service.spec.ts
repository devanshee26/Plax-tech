import {TestBed} from '@angular/core/testing';

import {PlacementService} from './placement.service';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {RecaptchaModule} from 'ng-recaptcha';
import {MaterialModule} from '../material.module';

describe('PlacementService', () => {
  let service: PlacementService;

  it('R1.3', (done: DoneFn) => {
    service.get('naukri').subscribe(value => {
      expect(value.length).toBeGreaterThanOrEqual(0);
      done();
    }, error => {
      expect(error.length).toBeGreaterThanOrEqual(0);
      done();
    });
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        RecaptchaModule,
        MaterialModule
      ],
    });
    service = TestBed.inject(PlacementService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('R1.1', (done: DoneFn) => {
    service.get('google').subscribe(value => {
      expect(value.length).toBeGreaterThanOrEqual(0);
      done();
    }, error => {
      expect(error.length).toBeGreaterThanOrEqual(0);
      done();
    });
  });

  it('R1.2', (done: DoneFn) => {
    service.get('aws').subscribe(value => {
      expect(value.length).toBeGreaterThanOrEqual(0);
      done();
    }, error => {
      expect(error.length).toBeGreaterThanOrEqual(0);
      done();
    });
  });

  it('R1.3', (done: DoneFn) => {
    service.get('naukri').subscribe(value => {
      expect(value.length).toBeGreaterThanOrEqual(0);
      done();
    }, error => {
      expect(error.length).toBeGreaterThanOrEqual(0);
      done();
    });
  });

  it('R1.4', (done: DoneFn) => {
    service.get('past').subscribe(value => {
      expect(value.length).toBeGreaterThanOrEqual(0);
      done();
    }, error => {
      expect(error.length).toBeGreaterThanOrEqual(0);
      done();
    });
  });

  it('R1.5', (done: DoneFn) => {
    service.get('wrong').subscribe(value => {
      expect(value.status).toBe(404);
      done();
    }, error => {
      expect(error.status).toBe(404);
      done();
    });
  });

});
