import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationDeatailsComponent } from './accommodation-details.component';

describe('AccommodationDeatailsComponent', () => {
  let component: AccommodationDeatailsComponent;
  let fixture: ComponentFixture<AccommodationDeatailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationDeatailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationDeatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
