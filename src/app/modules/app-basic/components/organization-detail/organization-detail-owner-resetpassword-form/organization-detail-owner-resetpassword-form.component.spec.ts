import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationDetailOwnerResetpasswordFormComponent } from './organization-detail-owner-resetpassword-form.component';

describe('OrganizationDetailOwnerResetpasswordFormComponent', () => {
  let component: OrganizationDetailOwnerResetpasswordFormComponent;
  let fixture: ComponentFixture<OrganizationDetailOwnerResetpasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationDetailOwnerResetpasswordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationDetailOwnerResetpasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
