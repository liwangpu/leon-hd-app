import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LitimgIconItemComponent } from './litimg-icon-item.component';

describe('LitimgIconItemComponent', () => {
  let component: LitimgIconItemComponent;
  let fixture: ComponentFixture<LitimgIconItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LitimgIconItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LitimgIconItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
