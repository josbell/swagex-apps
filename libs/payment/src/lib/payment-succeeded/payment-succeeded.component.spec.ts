import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSucceededComponent } from './payment-succeeded.component';

describe('PaymentSucceededComponent', () => {
  let component: PaymentSucceededComponent;
  let fixture: ComponentFixture<PaymentSucceededComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSucceededComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSucceededComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
