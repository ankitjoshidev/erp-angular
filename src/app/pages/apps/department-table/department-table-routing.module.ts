import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';
import { DepartmentTableComponent } from './department-table.component';
import { DepartmentCreateUpdateComponent } from './department-create-update/department-create-update.component';


const routes: VexRoutes = [
  {
    path: '',
    component: DepartmentTableComponent,
    data: {
      toolbarShadowEnabled: false
    }
  },
  {
    path: 'form',
    component: DepartmentCreateUpdateComponent,
    data: {
      toolbarShadowEnabled: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AioTableRoutingModule {
}
