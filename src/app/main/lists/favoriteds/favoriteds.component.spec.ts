import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritedsComponent } from './favoriteds.component';

describe('FavoritedsComponent', () => {
  let component: FavoritedsComponent;
  let fixture: ComponentFixture<FavoritedsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritedsComponent]
    });
    fixture = TestBed.createComponent(FavoritedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
