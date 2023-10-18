import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSliderComponent } from './HomeSliderComponent';

describe('HomeSliderComponent', () => {
  let component: HomeSliderComponent;
  let fixture: ComponentFixture<HomeSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeSliderComponent],
    });
    fixture = TestBed.createComponent(HomeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
