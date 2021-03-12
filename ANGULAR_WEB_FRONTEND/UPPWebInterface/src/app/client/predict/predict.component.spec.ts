import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictComponent } from './predict.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {RecaptchaModule} from 'ng-recaptcha';
import {MaterialModule} from '../../material.module';
import {PlacementComponent} from '../placement/placement.component';
import {FooterMinComponent} from '../../footer-min/footer-min.component';

describe('PredictComponent', () => {
  let component: PredictComponent;
  let fixture: ComponentFixture<PredictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        RecaptchaModule,
        MaterialModule
      ],
      declarations: [ PredictComponent, FooterMinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
