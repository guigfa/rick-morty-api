import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterLocationsComponent } from './filter-locations.component';

describe('FilterLocationsComponent', () => {
  let component: FilterLocationsComponent;
  let fixture: ComponentFixture<FilterLocationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterLocationsComponent]
    });
    fixture = TestBed.createComponent(FilterLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
