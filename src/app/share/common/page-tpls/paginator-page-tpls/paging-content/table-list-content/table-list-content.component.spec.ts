import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListContentComponent } from './table-list-content.component';

describe('TableListContentComponent', () => {
  let component: TableListContentComponent;
  let fixture: ComponentFixture<TableListContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableListContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
