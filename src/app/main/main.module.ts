import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndividualComponent } from './individual/individual.component';
import { GroupComponent } from './group/group.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MainRoutingModule } from './main-routing.module';



@NgModule({
  declarations: [IndividualComponent, GroupComponent, MainNavComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
