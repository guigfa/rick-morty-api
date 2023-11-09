import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedLocationComponent } from './detailed-location.component';

describe('DetailedLocationComponent', () => {
  let component: DetailedLocationComponent;
  let fixture: ComponentFixture<DetailedLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedLocationComponent]
    });
    fixture = TestBed.createComponent(DetailedLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
