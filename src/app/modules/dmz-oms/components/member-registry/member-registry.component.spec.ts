import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRegistryComponent } from './member-registry.component';

describe('MemberRegistryComponent', () => {
  let component: MemberRegistryComponent;
  let fixture: ComponentFixture<MemberRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
