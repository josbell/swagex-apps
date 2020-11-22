import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanceClassPanelsComponent } from './dance-class-panels.component';

describe('DanceClassPanelsComponent', () => {
  let component: DanceClassPanelsComponent;
  let fixture: ComponentFixture<DanceClassPanelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanceClassPanelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanceClassPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
