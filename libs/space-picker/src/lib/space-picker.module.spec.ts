import { async, TestBed } from '@angular/core/testing';
import { SpacePickerModule } from './space-picker.module';

describe('SpacePickerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SpacePickerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SpacePickerModule).toBeDefined();
  });
});
