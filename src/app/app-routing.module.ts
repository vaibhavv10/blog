import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailsComponent } from './blog/blog-details/blog-details.component';

import { AuthGuard } from './auth/auth.guard';
import { BlogAddComponent } from './blog/blog-add/blog-add.component';
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Blog Home' }
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    data: { title: 'Show Blog Details' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: 'blog',
    canActivate: [AuthGuard],
    component: BlogComponent,
    data: { title: 'Blog' }
  },
  {
    path: 'blog/details/:id',
    canActivate: [AuthGuard],
    component: BlogDetailsComponent,
    data: { title: 'Blog Details' }
  },
  {
    path: 'blog/add',
    canActivate: [AuthGuard],
    component: BlogAddComponent,
    data: { title: 'Blog Add' }
  },
  {
    path: 'blog/edit/:id',
    canActivate: [AuthGuard],
    component: BlogEditComponent,
    data: { title: 'Blog Edit' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
