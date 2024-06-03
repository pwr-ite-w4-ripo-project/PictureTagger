import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PicSendFormComponent } from './pic-send-form/pic-send-form.component'
import { authGuard } from './auth.guard';
import { UserHistoryComponent } from './user-history/user-history.component';

export const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'send',
        component: PicSendFormComponent,
        canActivate: [authGuard]
      },
      {
        path: 'history',
        component: UserHistoryComponent,
        canActivate: [authGuard]
      },
];
