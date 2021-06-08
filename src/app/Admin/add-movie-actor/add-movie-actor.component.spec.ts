import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovieActorComponent } from './add-movie-actor.component';

describe('AddMovieActorComponent', () => {
  let component: AddMovieActorComponent;
  let fixture: ComponentFixture<AddMovieActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMovieActorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMovieActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
