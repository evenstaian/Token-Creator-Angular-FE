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
    path: 'create-token',
    component: InsiderComponent,
    children: [
      {
        path: '',
        component: CreateComponent
      },
      {
        path: 'details',
        component: CreateTokenDetailsComponent
      },
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
        component: MyListComponent
      },
    ],
    canActivate: [AuthGuard]
  }
];
