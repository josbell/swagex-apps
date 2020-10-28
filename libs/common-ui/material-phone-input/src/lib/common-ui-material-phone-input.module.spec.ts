import { async, TestBed } from '@angular/core/testing';
import { CommonUiMaterialPhoneInputModule } from './common-ui-material-phone-input.module';

describe('CommonUiMaterialPhoneInputModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiMaterialPhoneInputModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUiMaterialPhoneInputModule).toBeDefined();
  });
});
