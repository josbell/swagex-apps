import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectClassDateTimeComponent } from './select-class-date-time.component';

describe('SelectClassDateTimeComponent', () => {
  let component: SelectClassDateTimeComponent;
  let fixture: ComponentFixture<SelectClassDateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectClassDateTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectClassDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
