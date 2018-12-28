import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChangePasswordFormComponent } from './profile-change-password-form.component';

describe('ProfileChangePasswordFormComponent', () => {
  let component: ProfileChangePasswordFormComponent;
  let fixture: ComponentFixture<ProfileChangePasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileChangePasswordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileChangePasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
