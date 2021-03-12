import {TestBed} from '@angular/core/testing';

import {CodingService} from './coding.service';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {RecaptchaModule} from 'ng-recaptcha';
import {MaterialModule} from '../material.module';

describe('CodingService', () => {
  let service: CodingService;

  const runtimeError = {
    _id: '603ccefbadf90b373c51773a',
    language_id: 70,
    source_code: 'Coding goes here'
  };

  const compileError = {
    _id: '603ccefbadf90b373c51773a',
    language_id: 51,
    source_code: 'Coding goes here'
  };

  const Accepted = {
    _id: '603ccefbadf90b373c51773a',
    language_id: 71,
    source_code: 'for i in range(int(input())):\n    n = int(input())\n    a = list(map(int, input().split()))\n    flag = False\n    for i in range(1, n):\n        if a[i-1] < a[i]:\n            flag = True\n            break\n    if flag:\n         print("Yes")\n    else:\n         print("No")'
  };

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
    service = TestBed.inject(CodingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('R3.1', (done: DoneFn) => {
    service.get().subscribe(value => {
      expect(value.length).toBeGreaterThanOrEqual(0);
      done();
    }, error => {
      expect(error.length).toBeGreaterThanOrEqual(0);
      done();
    });
  });

  it('R3.2A', (done: DoneFn) => {
    service.getById('603ccefbadf90b373c51773a').subscribe(value => {
      expect(value._id).toBe('603ccefbadf90b373c51773a');
      done();
    }, error => {
      expect(error._id).toBe('603ccefbadf90b373c51773a');
      done();
    });
  });

  it('R3.2B', (done: DoneFn) => {
    service.getById('1').subscribe(value => {
      expect(value.status).toBe(500);
      done();
    }, error => {
      expect(error.status).toBe(500);
      done();
    });
  });

  it('R3.5-6A', (done: DoneFn) => {
    service.create(runtimeError).subscribe(value => {
      expect(value.status).toBe('Runtime Error (NZEC)');
      done();
    }, error => {
      expect(error.status).toBe('Runtime Error (NZEC)');
      done();
    });
  });

  it('R3.5-6B', (done: DoneFn) => {
    service.create(Accepted).subscribe(value => {
      expect(value.status).toBe('Accepted');
      done();
    }, error => {
      expect(error.status).toBe('Accepted');
      done();
    });
  });

  it('R3.5-6C', (done: DoneFn) => {
    service.create(compileError).subscribe(value => {
      expect(value.status).toBe('Compilation Error');
      done();
    }, error => {
      expect(error.status).toBe('Compilation Error');
      done();
    });
  });

});
