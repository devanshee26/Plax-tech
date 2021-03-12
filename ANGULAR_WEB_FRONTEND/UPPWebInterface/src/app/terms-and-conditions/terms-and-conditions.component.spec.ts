import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import {PlacementComponent} from '../client/placement/placement.component';
import {FooterMinComponent} from '../footer-min/footer-min.component';

describe('TermsAndConditionsComponent', () => {
  let component: TermsAndConditionsComponent;
  let fixture: ComponentFixture<TermsAndConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsAndConditionsComponent, FooterMinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
