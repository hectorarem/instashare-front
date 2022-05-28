import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MaterialModule} from "../../material.module";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatNativeDateModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
