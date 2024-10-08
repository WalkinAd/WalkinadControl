import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './components/layout/layout.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
  // Ruta de Login fuera del layout principal (sin header y footer)
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent, 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
    ]
  },

  // Redirigir a login por defecto
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Ruta comodín para redirigir a login en caso de no encontrar la ruta
  { path: '**', redirectTo: '/login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
