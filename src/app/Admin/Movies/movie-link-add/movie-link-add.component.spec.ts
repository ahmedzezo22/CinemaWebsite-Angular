import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieLinkAddComponent } from './movie-link-add.component';

describe('MovieLinkAddComponent', () => {
  let component: MovieLinkAddComponent;
  let fixture: ComponentFixture<MovieLinkAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieLinkAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieLinkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
