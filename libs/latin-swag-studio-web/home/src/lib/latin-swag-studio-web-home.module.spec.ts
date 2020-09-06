import { async, TestBed } from '@angular/core/testing';
import { LatinSwagStudioWebHomeModule } from './latin-swag-studio-web-home.module';

describe('LatinSwagStudioWebHomeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LatinSwagStudioWebHomeModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LatinSwagStudioWebHomeModule).toBeDefined();
  });
});
