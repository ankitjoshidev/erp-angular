import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { User } from './interfaces/user.model';
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

@UntilDestroy()
@Component({
  selector: 'vex-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
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
export class UserTableComponent implements OnInit, AfterViewInit {

  layoutCtrl = new UntypedFormControl('boxed');
  subject$: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);
  data$: Observable<User[]> = this.subject$.asObservable();
  users: User[];
  apiPath: string = 'users'
  @Input()
  columns: TableColumn<User>[] = [
    { label: 'First Name', property: 'firstName', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Last Name', property: 'lastName', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Email', property: 'email', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<User> | null;
  selection = new SelectionModel<User>(true, []);
  searchCtrl = new UntypedFormControl();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private apiService: CommonApiService, private userSubject: UserSubject) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  getData() {
    this.apiService.get(this.apiPath).subscribe(
      (response) => {
        this.users = response.users.map((user: Object)=>new User(user));
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = this.users; 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('API response:', response);
      },
      (error) => {
        console.error('API error:', error);
      }
    );
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
    this.router.navigate(['/apps/users/form']);
  }

  updateUser(user: User) {
    this.userSubject.storeUserDetails({action: "edit", data: user});
    this.router.navigate(['/apps/users/form']);
  }

  deleteUser(user: User) {
    this.apiService.delete(user.id, this.apiPath).subscribe(
      (response) => {
        this.getData();
        console.log('API response:', response);
      },
      (error) => {
        console.error('API error:', error);
      }
    );
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
