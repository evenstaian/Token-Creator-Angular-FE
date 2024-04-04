import { Routes} from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './pages/login/login.component';

import { AuthGuard } from '../services/guard/auth-guard.service';
import { AuthGuardIn } from '../services/guard/auth-in-guard.service'
import { CreateComponent } from './Modules/Titulos/create/create.component';
import { SignupComponent } from './pages/signup/signup.component';

export const Approutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardIn]
  },

  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthGuardIn]
  },

  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/criar-titulo', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'criar-titulo',
        component: CreateComponent
      },
    ],
    canActivate: [AuthGuard]
  }
];
