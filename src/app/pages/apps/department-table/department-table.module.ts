import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AioTableRoutingModule } from './department-table-routing.module';
import { DepartmentTableComponent } from './department-table.component';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from '../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { UserCreateUpdateModule } from './department-create-update/department-create-update.module';
import { CommonApiService } from 'src/app/services/api.service';


@NgModule({
  declarations: [DepartmentTableComponent],
  imports: [
    CommonModule,
    AioTableRoutingModule,
    PageLayoutModule,
    BreadcrumbsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    UserCreateUpdateModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonToggleModule
  ],
  providers:[CommonApiService]
})
export class UserTableModule {
}
