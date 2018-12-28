import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberHierarchyParamComponent } from './member-hierarchy-param.component';

describe('MemberHierarchyParamComponent', () => {
  let component: MemberHierarchyParamComponent;
  let fixture: ComponentFixture<MemberHierarchyParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberHierarchyParamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberHierarchyParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
