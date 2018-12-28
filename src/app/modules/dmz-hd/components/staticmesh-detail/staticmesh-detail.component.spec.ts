import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticmeshDetailComponent } from './staticmesh-detail.component';

describe('StaticmeshDetailComponent', () => {
  let component: StaticmeshDetailComponent;
  let fixture: ComponentFixture<StaticmeshDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticmeshDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticmeshDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
