import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorSpotSelectionComponent } from './floor-spot-selection.component';

describe('FloorSpotSelectionComponent', () => {
  let component: FloorSpotSelectionComponent;
  let fixture: ComponentFixture<FloorSpotSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorSpotSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorSpotSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
