import { Injectable } from "@angular/core";
import { PlanService } from "src/app/shared/plan.service";

export interface Controller {
    handle(params)
}

@Injectable({
    providedIn: 'root'
})
export class PricingController implements Controller {

    constructor(private planService: PlanService){

    }

    handle(params){
        this.planService.getPlanUrl(params.planName, this)
    }
}