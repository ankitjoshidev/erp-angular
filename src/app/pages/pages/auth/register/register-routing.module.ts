import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { RegisterComponent } from './register.component';
import { AuthGuardPubliceUser } from 'src/app/guards/publicUser';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardPubliceUser],
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class RegisterRoutingModule {
}
