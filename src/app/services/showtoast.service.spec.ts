import { TestBed } from '@angular/core/testing';

import { ShowtoastService } from './showtoast.service';

describe('ShowtoastService', () => {
  let service: ShowtoastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowtoastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
