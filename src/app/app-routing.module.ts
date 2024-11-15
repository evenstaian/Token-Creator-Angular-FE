import { Routes} from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './pages/login/login.component';

import { AuthGuard } from '../services/guard/auth-guard.service';
import { AuthGuardIn } from '../services/guard/auth-in-guard.service'
import { CreateComponent } from './Modules/Tokens/create/create.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InsiderComponent } from './layouts/insider/insider.component';
import { MyListComponent } from './Modules/Tokens/my-list/my-list.component';
import { CreateTokenDetailsComponent } from './Modules/Tokens/create/create-token-details/create-token-details.component';
import { NetworksComponent } from './Modules/Tokens/create/networks/networks.component';
import { CreateConfirmationComponent } from './Modules/Tokens/create/create-confirmation/create-confirmation.component';
import { CreateResponseComponent } from './Modules/Tokens/create/create-response/create-response.component';
import { MyAccountComponent } from './Modules/MyAccount/my-account.component';
import { WalletsComponent } from './Modules/MyAccount/wallets/wallets.component';
import { ProfileComponent } from './Modules/MyAccount/profile/profile.component';
import { PricingComponent } from './Modules/Payment/pricing/pricing.component';
import { AdicionalDataComponent } from './Modules/MyAccount/profile/adicional-data/adicional-data.component';
import { SubscriptionComponent } from './Modules/MyAccount/subscription/subscription.component';
import { AboutComponent } from './Modules/MyAccount/about/about.component';
import { DetailsComponent } from './Modules/Tokens/details/details.component';

export const Approutes: Routes = [
  {
    path: '',
    component: InsiderComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
    ],
    canActivate: [AuthGuardIn]
  },

  {
    path: 'token/:contractAddress',
    component: DetailsComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'create-token',
    component: FullComponent,
    children: [
      {
        path: '',
        component: CreateComponent
      },
      {
        path: 'details',
        component: CreateTokenDetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'details/:cloneId',
        component: CreateTokenDetailsComponent
      },
      {
        path: 'networks',
        component: NetworksComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'confirmation',
        component: CreateConfirmationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'success',
        component: CreateResponseComponent,
        canActivate: [AuthGuard]
      },
    ],
  },

  {
    path: 'my-account',
    component: FullComponent,
    children: [
      {
        path: '',
        component: MyAccountComponent,
        children: [
          {
            path: 'wallets',
            component: WalletsComponent
          },
          {
            path: 'profile',
            component: ProfileComponent
          },
          {
            path: 'subscription',
            component: SubscriptionComponent
          },
          {
            path: 'about',
            component: AboutComponent
          }
        ],
      },
      {
        path: 'aditional-data',
        component: AdicionalDataComponent
      }
    ],
    canActivate: [AuthGuard]
  },

  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/my-tokens', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'my-tokens',
        component: MyListComponent,
      },
    ],
    canActivate: [AuthGuard]
  },

  {
    path: 'pricing',
    component: PricingComponent
  }
];
