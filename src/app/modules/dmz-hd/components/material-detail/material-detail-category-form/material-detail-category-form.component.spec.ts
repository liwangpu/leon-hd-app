import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDetailCategoryFormComponent } from './material-detail-category-form.component';

describe('MaterialDetailCategoryFormComponent', () => {
  let component: MaterialDetailCategoryFormComponent;
  let fixture: ComponentFixture<MaterialDetailCategoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialDetailCategoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDetailCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
