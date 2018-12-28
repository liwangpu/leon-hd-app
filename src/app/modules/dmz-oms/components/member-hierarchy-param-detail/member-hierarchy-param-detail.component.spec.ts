import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberHierarchyParamDetailComponent } from './member-hierarchy-param-detail.component';

describe('MemberHierarchyParamDetailComponent', () => {
  let component: MemberHierarchyParamDetailComponent;
  let fixture: ComponentFixture<MemberHierarchyParamDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberHierarchyParamDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberHierarchyParamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
