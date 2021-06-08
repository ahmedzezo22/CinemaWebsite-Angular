import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMovieComponent } from './get-movie.component';

describe('GetMovieComponent', () => {
  let component: GetMovieComponent;
  let fixture: ComponentFixture<GetMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
