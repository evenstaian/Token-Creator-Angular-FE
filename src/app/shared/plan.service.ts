import { Injectable } from "@angular/core";
import { Auth } from "src/services/auth.service";
import { LoaderService } from "./loader.service";
import { SharedDataService } from "./shared-data.service";
import { Router } from "@angular/router";
import { AppService } from "src/services/app.service";
import { Controller, PricingController } from "../Modules/Payment/pricing/pricing.controller";

@Injectable({
    providedIn: 'root'
})
export class PlanService {
    constructor(
        public loaderService: LoaderService,
        private authService: Auth,
        private appService: AppService,
        private sharedDataService: SharedDataService,
        private router: Router,
    ) { }

    getPlanUrl(planName: string, controller: Controller) {
        this.loaderService.showLoader(true);
        
        this.authService.getUserData().subscribe(
          data => {
            if(!data.data.addresses){
              this.loaderService.showLoader(false);
              this.sharedDataService.setNavigationFlow('/pricing', '', { planName }, controller)
              this.router.navigate(['my-account/aditional-data'])
              return
            }
    
            this.appService.getPlanCheckout(planName).subscribe(
              data => {
                this.loaderService.showLoader(false);
                const plan: any = data;
                if (plan.url) {
                  window.location.href = plan.url;
                }
              },
              error => {
                this.loaderService.showLoader(false);
              }
            )
          },
          error => {
            this.loaderService.showLoader(false);
          }
        )
      }

      test(planName: string) {
        this.loaderService.showLoader(true);
        
        this.appService.getPlanCheckout(planName).subscribe(
            data => {
              this.loaderService.showLoader(false);
              const plan: any = data;
              if (plan.url) {
                window.location.href = plan.url;
              }
            },
            error => {
              this.loaderService.showLoader(false);
            }
          )
      }
}