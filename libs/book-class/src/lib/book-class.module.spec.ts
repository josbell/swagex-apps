import { async, TestBed } from '@angular/core/testing';
import { BookClassModule } from './book-class.module';

describe('BookClassModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BookClassModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(BookClassModule).toBeDefined();
  });
});
