import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PicSendFormComponent } from './pic-send-form/pic-send-form.component'

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
      },
];
