import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassBookingsComponent } from './class-bookings.component';

describe('ClassBookingsComponent', () => {
  let component: ClassBookingsComponent;
  let fixture: ComponentFixture<ClassBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
