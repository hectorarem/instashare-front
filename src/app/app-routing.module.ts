import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./frontend-main/frontend-main.module').then(
        (m) => m.FrontendMainModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'access',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
