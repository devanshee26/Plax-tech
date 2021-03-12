import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMinComponent } from './footer-min.component';

describe('FooterMinComponent', () => {
  let component: FooterMinComponent;
  let fixture: ComponentFixture<FooterMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterMinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
