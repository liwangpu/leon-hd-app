import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailRoleEditorComponent } from './account-detail-role-editor.component';

describe('AccountDetailRoleEditorComponent', () => {
  let component: AccountDetailRoleEditorComponent;
  let fixture: ComponentFixture<AccountDetailRoleEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailRoleEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailRoleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
