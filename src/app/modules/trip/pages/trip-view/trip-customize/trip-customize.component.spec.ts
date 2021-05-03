import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCustomizeComponent } from './trip-customize.component';

describe('TripCustomizeComponent', () => {
  let component: TripCustomizeComponent;
  let fixture: ComponentFixture<TripCustomizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripCustomizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripCustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
