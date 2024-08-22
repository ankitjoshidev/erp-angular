import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { Department } from './interfaces/department.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { UntypedFormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { CommonApiService } from 'src/app/services/api.service';
import { UserSubject } from 'src/app/subjects/userDetail';
import { DepartmentsData } from 'src/static-data/department';

@UntilDestroy()
@Component({
  selector: 'vex-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class DepartmentTableComponent implements OnInit, AfterViewInit {

  layoutCtrl = new UntypedFormControl('boxed');
  subject$: ReplaySubject<Department[]> = new ReplaySubject<Department[]>(1);
  data$: Observable<Department[]> = this.subject$.asObservable();
  departments: Department[];
  apiPath: string = 'users'
  @Input()
  columns: TableColumn<Department>[] = [
    { label: 'Name', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Department> | null;
  selection = new SelectionModel<Department>(true, []);
  searchCtrl = new UntypedFormControl();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private apiService: CommonApiService, private userSubject: UserSubject) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  getData() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = DepartmentsData; 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getData();
    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  ngAfterViewInit() {
  }

  createUser() {
    this.userSubject.storeUserDetails({action: "add", data: null});
    this.router.navigate(['/apps/department/form']);
  }

  updateUser(user: Department) {
    this.userSubject.storeUserDetails({action: "edit", data: user});
    this.router.navigate(['/apps/department/form']);
  }

  deleteUser(user: Department) {
    const indexToRemove: number = DepartmentsData.findIndex(x=>x.id !== user.id);
    DepartmentsData.splice(indexToRemove, 1);;
    this.getData();
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }
}
