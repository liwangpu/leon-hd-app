import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicListViewComponent } from './classic-list-view.component';

describe('ClassicListViewComponent', () => {
  let component: ClassicListViewComponent;
  let fixture: ComponentFixture<ClassicListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassicListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassicListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
