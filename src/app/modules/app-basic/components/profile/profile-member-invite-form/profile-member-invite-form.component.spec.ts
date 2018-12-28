import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMemberInviteFormComponent } from './profile-member-invite-form.component';

describe('ProfileMemberInviteFormComponent', () => {
  let component: ProfileMemberInviteFormComponent;
  let fixture: ComponentFixture<ProfileMemberInviteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileMemberInviteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMemberInviteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
