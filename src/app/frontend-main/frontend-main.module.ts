import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendMainRoutingModule } from './frontend-main-routing.module';
import { FrontendMainComponent } from './frontend-main.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from "../../material.module";
import {MatNativeDateModule} from "@angular/material/core";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    FrontendMainComponent,
  ],
  imports: [
    CommonModule,
    FrontendMainRoutingModule,
    SharedModule,
    RouterModule,
    MatNativeDateModule,
    MaterialModule,
    FlexLayoutModule,
  ],
})
export class FrontendMainModule { }
