import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCharactersComponent } from './filter-characters.component';

describe('FilterCharactersComponent', () => {
  let component: FilterCharactersComponent;
  let fixture: ComponentFixture<FilterCharactersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterCharactersComponent]
    });
    fixture = TestBed.createComponent(FilterCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
