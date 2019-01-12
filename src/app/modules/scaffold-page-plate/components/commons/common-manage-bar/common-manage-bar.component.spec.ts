import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonManageBarComponent } from './common-manage-bar.component';

describe('CommonManageBarComponent', () => {
  let component: CommonManageBarComponent;
  let fixture: ComponentFixture<CommonManageBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonManageBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonManageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
