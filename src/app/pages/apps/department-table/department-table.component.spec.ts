import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DepartmentTableComponent } from './department-table.component';

describe('DepartmentTableComponent', () => {
  let component: DepartmentTableComponent;
  let fixture: ComponentFixture<DepartmentTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
