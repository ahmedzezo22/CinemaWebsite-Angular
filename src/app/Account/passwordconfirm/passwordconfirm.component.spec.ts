import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordconfirmComponent } from './passwordconfirm.component';

describe('PasswordconfirmComponent', () => {
  let component: PasswordconfirmComponent;
  let fixture: ComponentFixture<PasswordconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordconfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
