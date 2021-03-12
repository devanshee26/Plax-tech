import {TestBed} from '@angular/core/testing';

import {PostServiceService} from './post-service.service';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {RecaptchaModule} from 'ng-recaptcha';
import {MaterialModule} from '../material.module';

describe('PostServiceService', () => {
  let service: PostServiceService;

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
    service = TestBed.inject(PostServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('R5.3', (done: DoneFn) => {
    service.getPost().subscribe(value => {
      expect(value.length).toBeGreaterThanOrEqual(0);
      done();
    }, error => {
      expect(error.length).toBeGreaterThanOrEqual(0);
      done();
    });
  });

  it('R5.4A', (done: DoneFn) => {
    service.getPostById('603dcf5fded6350034a502d1').subscribe(value => {
      expect(value._id).toBe('603dcf5fded6350034a502d1');
      done();
    }, error => {
      expect(error._id).toBe('603dcf5fded6350034a502d1');
      done();
    });
  });

  it('R5.4B', (done: DoneFn) => {
    service.getPostById('Wrong').subscribe(value => {
      // @ts-ignore
      expect(value.status).toBe(500);
      done();
    }, error => {
      expect(error.status).toBe(500);
      done();
    });
  });
  /*
  it('R5.2', (done: DoneFn) => {
    const comment = {
      _id: '603dcf5fded6350034a502d1',
      author: 'Anonymous',
      content: 'Automated Testing'
    };
    service.addComment(comment).subscribe(value => {
      // @ts-ignore
      expect(value.nModified).toBe(1);
      done();
    }, error => {
      expect(error.nModified).toBe(1);
      done();
    });
  });
  */
});
