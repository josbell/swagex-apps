import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorSpotComponent } from './floor-spot.component';

describe('FloorSpotComponent', () => {
  let component: FloorSpotComponent;
  let fixture: ComponentFixture<FloorSpotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorSpotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
