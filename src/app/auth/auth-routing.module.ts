import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authRoutes } from '../core/config/routes';

const routes: Routes = [...authRoutes];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
