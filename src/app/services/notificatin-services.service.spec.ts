import { TestBed } from '@angular/core/testing';

import { NotificatinServicesService } from './notificatin-services.service';

describe('NotificatinServicesService', () => {
  let service: NotificatinServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificatinServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
