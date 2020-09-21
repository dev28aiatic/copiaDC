import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import {CheckGuardGuard} from './services/check-guard.guard';

//redireccion a la pagina de register
const routes: Routes = [


  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'register', loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule) },
  { path: 'records', loadChildren: () => import('./components/records/records.module').then(m => m.RecordsModule), canActivate:[CheckGuardGuard]},
  { path: 'video', loadChildren: () => import('./components/video/video.module').then(m => m.VideoModule) },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'profile', loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule), canActivate:[CheckGuardGuard] },
  {path:'contact', component:ContactComponent},
  { path: 'team', loadChildren: () => import('./components/team/team.module').then(m => m.TeamModule) },
  { path: '**',
    redirectTo: '/home',
    pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
