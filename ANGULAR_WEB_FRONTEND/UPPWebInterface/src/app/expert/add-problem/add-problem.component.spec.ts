import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProblemComponent } from './add-problem.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {RecaptchaModule} from 'ng-recaptcha';
import {MaterialModule} from '../../material.module';
import {PlacementComponent} from '../../client/placement/placement.component';
import {FooterMinComponent} from '../../footer-min/footer-min.component';

describe('AddProblemComponent', () => {
  let component: AddProblemComponent;
  let fixture: ComponentFixture<AddProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProblemComponent, FooterMinComponent ],
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
    fixture = TestBed.createComponent(AddProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
