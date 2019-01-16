import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LitimgListContentComponent } from './litimg-list-content.component';

describe('LitimgListContentComponent', () => {
  let component: LitimgListContentComponent;
  let fixture: ComponentFixture<LitimgListContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LitimgListContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LitimgListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
