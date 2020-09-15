import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookClassSpotsComponent } from './book-class-spots.component';

describe('BookClassSpotsComponent', () => {
  let component: BookClassSpotsComponent;
  let fixture: ComponentFixture<BookClassSpotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookClassSpotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookClassSpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
