import { TestBed } from '@angular/core/testing';

import { InterfaceService } from './interface.service';

describe('InterfacService', () => {
  let service: InterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
