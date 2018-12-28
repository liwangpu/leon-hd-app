import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailResetpwdFormComponent } from './account-detail-resetpwd-form.component';

describe('AccountDetailResetpwdFormComponent', () => {
  let component: AccountDetailResetpwdFormComponent;
  let fixture: ComponentFixture<AccountDetailResetpwdFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailResetpwdFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailResetpwdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
