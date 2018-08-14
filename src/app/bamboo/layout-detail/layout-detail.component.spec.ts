import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDetailComponent } from './layout-detail.component';

describe('LayoutDetailComponent', () => {
  let component: LayoutDetailComponent;
  let fixture: ComponentFixture<LayoutDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
