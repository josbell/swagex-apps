import { async, TestBed } from '@angular/core/testing';
import { CommonUiMaterialLayoutWebModule } from './common-ui-material-layout-web.module';

describe('CommonUiMaterialLayoutWebModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiMaterialLayoutWebModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUiMaterialLayoutWebModule).toBeDefined();
  });
});
