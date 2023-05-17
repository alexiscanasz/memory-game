import { TestBed } from '@angular/core/testing';

import { InformationService } from './information.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InformationService', () => {
  let service: InformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(InformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
