import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterEpisodesComponent } from './filter-episodes.component';

describe('FilterEpisodesComponent', () => {
  let component: FilterEpisodesComponent;
  let fixture: ComponentFixture<FilterEpisodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterEpisodesComponent]
    });
    fixture = TestBed.createComponent(FilterEpisodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
