import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticmeshComponent } from './staticmesh.component';

describe('StaticmeshComponent', () => {
  let component: StaticmeshComponent;
  let fixture: ComponentFixture<StaticmeshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticmeshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticmeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
