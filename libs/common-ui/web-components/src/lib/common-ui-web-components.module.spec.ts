import { async, TestBed } from '@angular/core/testing';
import { CommonUiWebComponentsModule } from './common-ui-web-components.module';

describe('CommonUiWebComponentsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiWebComponentsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUiWebComponentsModule).toBeDefined();
  });
});
