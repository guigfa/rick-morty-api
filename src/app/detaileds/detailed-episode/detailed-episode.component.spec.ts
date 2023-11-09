import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedEpisodeComponent } from './detailed-episode.component';

describe('DetailedEpisodeComponent', () => {
  let component: DetailedEpisodeComponent;
  let fixture: ComponentFixture<DetailedEpisodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedEpisodeComponent]
    });
    fixture = TestBed.createComponent(DetailedEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
