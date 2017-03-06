/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CastService } from './cast-service.service';

describe('CastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CastService]
    });
  });

  it('should ...', inject([CastService], (service: CastService) => {
    expect(service).toBeTruthy();
  }));
});
