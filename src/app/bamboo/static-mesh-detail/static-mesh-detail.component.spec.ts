import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticMeshDetailComponent } from './static-mesh-detail.component';

describe('StaticMeshDetailComponent', () => {
  let component: StaticMeshDetailComponent;
  let fixture: ComponentFixture<StaticMeshDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticMeshDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticMeshDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
