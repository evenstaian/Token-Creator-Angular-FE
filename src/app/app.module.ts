// import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy,
  registerLocaleData
} from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AuthGuard } from 'src/services/guard/auth-guard.service';
import { AuthGuardIn } from 'src/services/guard/auth-in-guard.service';
import { RouteGuard } from 'src/services/guard/route-guard.service';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HttpErrorHandler } from 'src/services/http-handle-error.service';
import { MessageService } from 'src/services/message.service';
import { Clean } from 'src/utils/clean';
import { Requests } from 'src/services/requests.services';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AngularImageViewerModule } from 'angular-x-image-viewer';
import { ChartsModule } from 'ng2-charts';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { CreateComponent } from './Modules/Titulos/create/create.component';
import { ResponseBoxComponent } from './component/response-box/response-box.component';
import { InsiderComponent } from './layouts/insider/insider.component';
import { BannerSlideshowComponent } from './component/banner-slideshow/banner-slideshow.component';
import { CircularThumbImageComponent } from './component/circular-thumb-image/circular-thumb-image.component';
import { MyListComponent } from './Modules/Tokens/my-list/my-list.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    BreadcrumbComponent,
    LoginComponent,
    CreateComponent,
    ResponseBoxComponent,
    SignupComponent,
    InsiderComponent,
    BannerSlideshowComponent,
    CircularThumbImageComponent,
    MyListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PerfectScrollbarModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: true }),
    TextMaskModule,
    SweetAlert2Module.forRoot(),
    NgxSkeletonLoaderModule,
    LottieModule.forRoot({ player: playerFactory }),
    AngularImageViewerModule,
    ChartsModule,
    UiSwitchModule
  ],
  providers: [AuthGuard, AuthGuardIn, RouteGuard, HttpErrorHandler, MessageService, Clean, Requests,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: LOCALE_ID, useValue: 'pt-PT' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
