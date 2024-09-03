import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';
import { ClientTableComponent } from './client-table.component';
import { ClientCreateUpdateComponent } from './client-create-update/client-create-update.component'; 


const routes: VexRoutes = [
  {
    path: '',
    component: ClientTableComponent,
    data: {
      toolbarShadowEnabled: false
    }
  },
  {
    path: 'form',
    component: ClientCreateUpdateComponent,
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
