import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { EditUserComponent } from '../edit-user/edit-user.component';
import { Subscription } from 'rxjs';
import { MainService } from '../main.service';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  constructor(
    public appService: AppService,
    private router: Router,
    private ngbModal: NgbModal,
    private mainService: MainService
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
    this.mainService.image$.subscribe((res) => {
      if (!res) return;
      this.appService.user.base64 = res.data.base64;
      this.appService.user.image = `data:${'image/jpeg'};base64,${
        res.data.base64
      }`;
    });
    this.mainService.connect();
  }
  refresh() {
    this.mainService.getImage();
  }
  logout() {
    this.appService.user = null;
    localStorage.removeItem('autter_token');
    this.router.navigateByUrl('/auth/login');
  }
  edit() {
    //this.ngbModal.open(EditUserComponent, { size: 'lg' });
  }

  ngOnDestroy() {
    this.mainService.conn = null;
  }
}
