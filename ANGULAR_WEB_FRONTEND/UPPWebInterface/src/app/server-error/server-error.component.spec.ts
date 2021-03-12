import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerErrorComponent } from './server-error.component';
import {PlacementComponent} from '../client/placement/placement.component';
import {FooterMinComponent} from '../footer-min/footer-min.component';

describe('ServerErrorComponent', () => {
  let component: ServerErrorComponent;
  let fixture: ComponentFixture<ServerErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerErrorComponent, FooterMinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
