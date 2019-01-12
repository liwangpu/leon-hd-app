import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleConfirmMessageDialogComponent } from './simple-confirm-message-dialog.component';

describe('SimpleConfirmMessageDialogComponent', () => {
  let component: SimpleConfirmMessageDialogComponent;
  let fixture: ComponentFixture<SimpleConfirmMessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleConfirmMessageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleConfirmMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
