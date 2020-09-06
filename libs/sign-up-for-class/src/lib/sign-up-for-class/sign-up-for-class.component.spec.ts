import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpForClassComponent } from './sign-up-for-class.component';

describe('SignUpForClassComponent', () => {
  let component: SignUpForClassComponent;
  let fixture: ComponentFixture<SignUpForClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpForClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpForClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
