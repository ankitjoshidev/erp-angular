import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';
import { UserTableComponent } from './user-table.component';
import { UserCreateUpdateComponent } from './user-create-update/user-create-update.component';


const routes: VexRoutes = [
  {
    path: '',
    component: UserTableComponent,
    data: {
      toolbarShadowEnabled: false
    }
  },
  {
    path: 'form',
    component: UserCreateUpdateComponent,
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
