import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberHierarchyParamSettingExComponent } from './member-hierarchy-param-setting-ex.component';

describe('MemberHierarchyParamSettingExComponent', () => {
  let component: MemberHierarchyParamSettingExComponent;
  let fixture: ComponentFixture<MemberHierarchyParamSettingExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberHierarchyParamSettingExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberHierarchyParamSettingExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
