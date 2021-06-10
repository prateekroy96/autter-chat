import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndividualComponent } from './individual/individual.component';
import { GroupComponent } from './group/group.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MainRoutingModule } from './main-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  declarations: [
    IndividualComponent,
    GroupComponent,
    MainNavComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    ImageCropperModule,
  ],
  entryComponents: [EditUserComponent],
})
export class MainModule {}
