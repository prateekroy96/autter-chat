import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {  mainRoutes } from "../@core/config/routes";

const routes: Routes = [...mainRoutes];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}