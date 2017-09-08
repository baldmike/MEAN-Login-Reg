import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [],
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'register',
    children: [],
    component: RegisterComponent
  },
  {
    path: 'login',
    children: [],
    component: LoginComponent
  },
  {
    path: 'dashboard',
    children: [],
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    children: [],
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }