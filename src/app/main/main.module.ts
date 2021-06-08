import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndividualComponent } from './individual/individual.component';
import { GroupComponent } from './group/group.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MainRoutingModule } from './main-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
@NgModule({
  declarations: [IndividualComponent, GroupComponent, MainNavComponent],
  imports: [CommonModule, MainRoutingModule, ReactiveFormsModule, RouterModule, NgbModule],
})
export class MainModule {}
