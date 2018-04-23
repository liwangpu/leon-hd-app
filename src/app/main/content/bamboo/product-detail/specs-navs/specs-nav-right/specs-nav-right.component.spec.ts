import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecsNavRightComponent } from './specs-nav-right.component';

describe('SpecsNavRightComponent', () => {
  let component: SpecsNavRightComponent;
  let fixture: ComponentFixture<SpecsNavRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecsNavRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecsNavRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
