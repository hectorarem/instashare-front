import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontendMainComponent } from './frontend-main.component';

const routes: Routes = [{ path: '', component: FrontendMainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendMainRoutingModule { }
