import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyModuleConfirmDialogPlateComponent } from './lazy-module-confirm-dialog-plate.component';

describe('LazyModuleConfirmDialogPlateComponent', () => {
  let component: LazyModuleConfirmDialogPlateComponent;
  let fixture: ComponentFixture<LazyModuleConfirmDialogPlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyModuleConfirmDialogPlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyModuleConfirmDialogPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
