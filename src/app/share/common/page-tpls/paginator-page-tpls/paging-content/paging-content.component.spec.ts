import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagingContentComponent } from './paging-content.component';

describe('PagingContentComponent', () => {
  let component: PagingContentComponent;
  let fixture: ComponentFixture<PagingContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagingContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
