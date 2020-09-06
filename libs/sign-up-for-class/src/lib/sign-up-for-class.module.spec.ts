import { async, TestBed } from '@angular/core/testing';
import { SignUpForClassModule } from './sign-up-for-class.module';

describe('SignUpForClassModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SignUpForClassModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SignUpForClassModule).toBeDefined();
  });
});
