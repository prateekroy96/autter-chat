import { CoreService } from './../core/core.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [CoreService, AdminGuard, UserGuard, LoginGuard],
})
export class CoreModule {}
