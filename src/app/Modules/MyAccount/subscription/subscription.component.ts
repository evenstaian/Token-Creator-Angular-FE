import { Component, OnInit } from '@angular/core';
import { PlansTypeService, Product } from '../../../shared/plans-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  currentPlan: Product;
  purchaseDate: Date = new Date('2023-01-01'); // This should be fetched from a user service
  renewalDate: Date = new Date('2023-12-31'); // This should be fetched from a user service

  constructor(
    private plansTypeService: PlansTypeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchCurrentPlan();
  }

  fetchCurrentPlan(): void {
    // This should be replaced with actual logic to fetch the user's current plan
    // For now, we'll assume the user has the 'Rookie' plan
    const userPlanName = 'Rookie';
    this.currentPlan = this.plansTypeService.products.find(plan => plan.title === userPlanName);
  }

  upgradePlan(): void {
    // Navigate to the pricing page
    this.router.navigate(['/pricing']);
  }
}
