import { TestBed } from '@angular/core/testing';

import { FileServicesService } from './file-services.service';

describe('FileServicesService', () => {
  let service: FileServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
