import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticMeshComponent } from './static-mesh.component';

describe('StaticMeshComponent', () => {
  let component: StaticMeshComponent;
  let fixture: ComponentFixture<StaticMeshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticMeshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticMeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
