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
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AngularImageViewerModule } from 'angular-x-image-viewer';
import { ChartsModule } from 'ng2-charts';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { CreateComponent } from './Modules/Tokens/create/create.component';
import { ResponseBoxComponent } from './component/response-box/response-box.component';
import { InsiderComponent } from './layouts/insider/insider.component';
import { BannerSlideshowComponent } from './component/banner-slideshow/banner-slideshow.component';
import { CircularThumbImageComponent } from './component/circular-thumb-image/circular-thumb-image.component';
import { MyListComponent } from './Modules/Tokens/my-list/my-list.component';
import { PageTitlesComponent } from './component/molecules/page-titles/page-titles.component';
import { SharedDataService } from './shared/shared-data.service';
import { LoaderService } from './shared/loader.service';
import { CreateTokenDetailsComponent } from './Modules/Tokens/create/create-token-details/create-token-details.component';
import { NetworksComponent } from './Modules/Tokens/create/networks/networks.component';
import { ImageSenderComponent } from './component/molecules/image-sender/image-sender.component';
import { CreateConfirmationComponent } from './Modules/Tokens/create/create-confirmation/create-confirmation.component';
import { CreateResponseComponent } from './Modules/Tokens/create/create-response/create-response.component';
import { LoaderComponent } from './component/loader/loader.component';
import { TokenActionsComponent } from './component/molecules/token-actions/token-actions.component';
import { SoundService } from '../services/sound/sound.service';
import { FullLoaderComponent } from './component/organisms/full-loader/full-loader.component';
import { ProcessStatusTagComponent } from './component/molecules/process-status-tag/process-status-tag.component';
import { MyAccountComponent } from './Modules/MyAccount/my-account.component';
import { AccountMenuComponent } from './component/molecules/account-menu/account-menu.component';
import { WalletsComponent } from './Modules/MyAccount/wallets/wallets.component';
import { CollectionItemsComponent } from './component/organisms/collection-items/collection-items.component';
import { ProfileComponent } from './Modules/MyAccount/profile/profile.component';
import { PaymentComponent } from './Modules/Payment/payment.component';
import { PricingComponent } from './Modules/Payment/pricing/pricing.component';
import { PricingController } from './Modules/Payment/pricing/pricing.controller';
import { ProductCardComponent } from './component/organisms/product-card/product-card.component';
import { YoutubePlayerComponent } from './component/organisms/youtube-player/youtube-player.component';
import { TokenTypeService } from './shared/token-type.service';
import { PlanService } from './shared/plan.service';
import { AdicionalDataComponent } from './Modules/MyAccount/profile/adicional-data/adicional-data.component';
import { AppService } from 'src/services/app.service';
import { Auth } from 'src/services/auth.service';
import { MaskPipe } from 'src/app/pipes/mask.pipe';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SubscriptionComponent } from './Modules/MyAccount/subscription/subscription.component';
import { AboutComponent } from './Modules/MyAccount/about/about.component';

import { NotificationComponent } from './component/notification/notification.component';
import { NotificationService } from '../services/notification.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};

export function playerFactory() {
  return player;
}

const maskConfig: Partial<IConfig> = {
  validation: false,
  thousandSeparator: '.',
};

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
    MyListComponent,
    PageTitlesComponent,
    CreateTokenDetailsComponent,
    NetworksComponent,
    ImageSenderComponent,
    CreateConfirmationComponent,
    CreateResponseComponent,
    LoaderComponent,
    TokenActionsComponent,
    FullLoaderComponent,
    ProcessStatusTagComponent,
    MyAccountComponent,
    AccountMenuComponent,
    WalletsComponent,
    CollectionItemsComponent,
    ProfileComponent,
    PaymentComponent,
    PricingComponent,
    ProductCardComponent,
    AdicionalDataComponent,
    YoutubePlayerComponent,
    MaskPipe,
    SubscriptionComponent,
    AboutComponent,
    NotificationComponent
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
    UiSwitchModule,
    NgxMaskModule.forRoot(maskConfig),
    PdfViewerModule,
  ],
  providers: [
    AuthGuard, 
    AuthGuardIn, 
    RouteGuard, 
    HttpErrorHandler, 
    MessageService, 
    Clean, 
    Auth,
    AppService,
    SharedDataService,
    LoaderService,
    SoundService,
    TokenTypeService,
    PlanService,
    PricingController,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: LOCALE_ID, useValue: 'pt-PT' },
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
