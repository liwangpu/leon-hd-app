import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRegistryDetailComponent } from './member-registry-detail.component';

describe('MemberRegistryDetailComponent', () => {
  let component: MemberRegistryDetailComponent;
  let fixture: ComponentFixture<MemberRegistryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRegistryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRegistryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
