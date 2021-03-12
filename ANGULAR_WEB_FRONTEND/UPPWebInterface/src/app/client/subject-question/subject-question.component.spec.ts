import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectQuestionComponent } from './subject-question.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {RecaptchaModule} from 'ng-recaptcha';
import {MaterialModule} from '../../material.module';
import {PlacementComponent} from '../placement/placement.component';
import {FooterMinComponent} from '../../footer-min/footer-min.component';

describe('SubjectQuestionComponent', () => {
  let component: SubjectQuestionComponent;
  let fixture: ComponentFixture<SubjectQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectQuestionComponent, FooterMinComponent ],
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
    fixture = TestBed.createComponent(SubjectQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
