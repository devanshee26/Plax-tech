import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionComponent } from './add-question.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {RecaptchaModule} from 'ng-recaptcha';
import {MaterialModule} from '../../material.module';
import {PlacementComponent} from '../../client/placement/placement.component';
import {FooterMinComponent} from '../../footer-min/footer-min.component';

describe('AddQuestionComponent', () => {
  let component: AddQuestionComponent;
  let fixture: ComponentFixture<AddQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestionComponent, FooterMinComponent ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        RecaptchaModule,
        MaterialModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
