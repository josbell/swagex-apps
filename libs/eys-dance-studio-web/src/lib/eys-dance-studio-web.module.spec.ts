import { async, TestBed } from '@angular/core/testing';
import { EysDanceStudioWebModule } from './eys-dance-studio-web.module';

describe('EysDanceStudioWebModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [EysDanceStudioWebModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(EysDanceStudioWebModule).toBeDefined();
  });
});
