import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacePickerContainerComponent } from './space-picker-container.component';

describe('SpacePickerContainerComponent', () => {
  let component: SpacePickerContainerComponent;
  let fixture: ComponentFixture<SpacePickerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacePickerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacePickerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
