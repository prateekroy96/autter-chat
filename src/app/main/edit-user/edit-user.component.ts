import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { MainService } from '../main.service';
declare var swal;
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  originalImageData: {
    file: any;
    image: string;
    base64: string;
  };
  newImageData: {
    base64: string;
  } = {
    base64: null,
  };
  loading: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,
    public appService: AppService,
    private mainService: MainService
  ) {}

  ngOnInit(): void {
    this.setDefaultImage();
  }
  setDefaultImage() {
    if (this.appService.user.base64) {
      this.originalImageData = {
        file: null,
        image: `data:${'image/jpeg'};base64,${this.appService.user.base64}`,
        base64: this.appService.user.base64,
      };
    } else {
      this.originalImageData = {
        file: null,
        image: null,
        base64: null,
      };
    }
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.newImageData = { base64: event.base64.toString().split(',').pop() };
  }
  imageLoaded(image: any) {}
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  // onFileChange(event) {
  //   if (event.target.files[0]) {
  //     console.log('file change event:', event.target.files[0].size);
  //     if (event.target.files.length > 0) {
  //       this.originalImageData.file = event.target.files[0];
  //       var fileToLoad = event.target.files[0];
  //       const reader = new FileReader();
  //       reader.readAsDataURL(fileToLoad);
  //       reader.onload = () => {
  //         console.log('on load ', reader.result.toString());
  //         this.originalImageData.image = reader.result.toString();
  //         this.originalImageData.base64 = reader.result
  //           .toString()
  //           .split(',')
  //           .pop();
  //         this.originalImageData.format = reader.result
  //           .toString()
  //           .split(',')[0]
  //           .split(/;|:/)[1];
  //         console.log(this.originalImageData.format);
  //       };
  //       reader.onerror = (error) => {};
  //     } else {
  //       this.setDefaultImage();
  //     }
  //   } else {
  //     this.setDefaultImage();
  //   }
  // }
  setImageSub: Subscription;
  setImage() {
    if (!this.newImageData.base64) return;

    if (this.loading) return;
    if (this.mainService.fileSize(this.newImageData.base64) > 102400) {
      return swal({
        title: 'Image too large',
        text: `Image size should be less than 100kB. Current Size: ${
          Math.round(
            (this.mainService.fileSize(this.newImageData.base64) * 100) / 1024
          ) / 100
        }kB`,
        icon: 'Error',
      });
    } else {
      console.log(
        Math.round(
          (this.mainService.fileSize(this.newImageData.base64) * 100) / 1024
        ) / 100
      );
    }
    if (this.setImageSub) this.setImageSub.unsubscribe();
    this.loading = true;

    this.setImageSub = this.mainService
      .setImage({
        ...this.newImageData,
      })
      .subscribe(
        (res) => {
          this.loading = false;
          console.log(res);
          swal({
            title: res.message,
            icon: 'success',
          });
          this.activeModal.dismiss('Cross click');
          this.mainService.getImage();
        },
        (err) => {
          console.log(err);
          swal({
            title: err.message,
            icon: 'error',
          });
          this.loading = false;
        }
      );
  }
}
