import { async, TestBed } from '@angular/core/testing';
import { CommonUiClassListModule } from './common-ui-class-list.module';

describe('CommonUiClassListModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiClassListModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUiClassListModule).toBeDefined();
  });
});
