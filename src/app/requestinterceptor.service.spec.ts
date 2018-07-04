import { TestBed, inject } from '@angular/core/testing';

import { RequestinterceptorService } from './requestinterceptor.service';

describe('RequestinterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestinterceptorService]
    });
  });

  it('should be created', inject([RequestinterceptorService], (service: RequestinterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
