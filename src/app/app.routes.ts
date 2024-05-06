import { Routes } from '@angular/router';
import { HomeComponent } from './body/home/home.component';
import { AboutComponent } from './body/about/about.component';
import { RegisterComponent } from './body/register/register.component';
import { LoginComponent } from './body/login/login.component';
import { UserComponent } from './body/user/user.component';
import { UsershowComponent } from './body/usershow/usershow.component';
import { LoaderComponent } from './body/loader/loader.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent },
  { path: 'usershow', component: UsershowComponent },
  { path: 'loader', component: LoaderComponent },
  //   {
  //     path: 'user',
  //     loadChildren: () =>
  //       import('./user/user.routes').then((m) => m.UserRoutingModule),
  //   },
];
