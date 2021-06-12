import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { EditUserComponent } from '../edit-user/edit-user.component';
import { Subscription } from 'rxjs';
import { MainService } from '../main.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  subs = new SubSink();
  constructor(
    public appService: AppService,
    private router: Router,
    private ngbModal: NgbModal,
    private mainService: MainService,
    private localStorageService: LocalStorageService
  ) {
    this.router.events.subscribe((event) => {
      this.ngbModal.dismissAll();
    });
  }
  isLoading = {
    getImage: false,
  };
  image: string = null;
  ngOnInit(): void {
    this.mainService.getImage();
    this.mainService.image$.subscribe(
      (res) => {
        if (!res) return;
        this.appService.user.base64 = res.data.base64;
        this.appService.user.image = `data:${'image/jpeg'};base64,${
          res.data.base64
        }`;
      },
      (err) => {
        console.log(err);
      }
    );
    this.mainService.connect();
  }
  refresh() {
    this.mainService.getImage();
  }
  logout() {
    this.appService.user = null;
    this.localStorageService.removeItem('autter_token');
    this.router.navigateByUrl('/auth/login');
  }
  edit() {
    this.ngbModal.open(EditUserComponent, { size: 'lg' });
  }

  ngOnDestroy() {
    this.mainService.purge();
  }
}
