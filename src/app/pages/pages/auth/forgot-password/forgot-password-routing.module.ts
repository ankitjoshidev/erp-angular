import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AuthGuardPubliceUser } from 'src/app/guards/publicUser';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardPubliceUser],
    component: ForgotPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class ForgotPasswordRoutingModule {
}
