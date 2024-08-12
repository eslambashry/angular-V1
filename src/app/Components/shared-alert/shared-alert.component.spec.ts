import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAlertComponent } from './shared-alert.component';

describe('SharedAlertComponent', () => {
  let component: SharedAlertComponent;
  let fixture: ComponentFixture<SharedAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
