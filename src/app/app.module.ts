import { RouterModule } from '@angular/router';
import { AppService } from './app.service';
import { AppInterceptor } from './core/interceptors/app.interceptor';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorage } from './core/models/localStorage';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    console.error(error);
    if (chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
    // other stuff for error handling.
  }
}
export function localStorageFactory() {
  return localStorage;
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
    { provide: LocalStorage, useFactory: localStorageFactory },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    AppService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
