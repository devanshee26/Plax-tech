import {HttpClientModule} from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddPostComponent} from './add-post.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RecaptchaModule} from 'ng-recaptcha';
import {MaterialModule} from '../../material.module';
import {PlacementComponent} from '../../client/placement/placement.component';
import {FooterMinComponent} from '../../footer-min/footer-min.component';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPostComponent, FooterMinComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        RecaptchaModule,
        MaterialModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
