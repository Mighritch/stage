import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { PersonnelAuthGuard } from './auth/guards/personnel-auth.guard';

const routes: Routes = [
 // Dans app-routing.module.ts
{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin-crud/admin-crud.module').then(m => m.AdminCrudModule),
    canActivate: [AuthGuard] 
  },
  { 
    path: 'personnel', 
    loadChildren: () => import('./auth/personnel/personnel.module').then(m => m.PersonnelModule),
    canActivate: [PersonnelAuthGuard]
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }