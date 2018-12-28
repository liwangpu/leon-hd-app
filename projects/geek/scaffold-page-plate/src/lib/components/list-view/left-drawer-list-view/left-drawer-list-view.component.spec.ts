import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftDrawerListViewComponent } from './left-drawer-list-view.component';

describe('LeftDrawerListViewComponent', () => {
  let component: LeftDrawerListViewComponent;
  let fixture: ComponentFixture<LeftDrawerListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftDrawerListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftDrawerListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
