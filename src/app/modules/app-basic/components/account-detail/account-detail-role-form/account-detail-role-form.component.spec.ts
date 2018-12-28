import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailRoleFormComponent } from './account-detail-role-form.component';

describe('AccountDetailRoleFormComponent', () => {
  let component: AccountDetailRoleFormComponent;
  let fixture: ComponentFixture<AccountDetailRoleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailRoleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
