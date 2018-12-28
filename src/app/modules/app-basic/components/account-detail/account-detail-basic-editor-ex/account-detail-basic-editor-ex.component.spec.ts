import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailBasicEditorExComponent } from './account-detail-basic-editor-ex.component';

describe('AccountDetailBasicEditorExComponent', () => {
  let component: AccountDetailBasicEditorExComponent;
  let fixture: ComponentFixture<AccountDetailBasicEditorExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailBasicEditorExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailBasicEditorExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
