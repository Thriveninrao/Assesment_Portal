import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { MatTableComponent } from './mat-table/mat-table.component';
import { RouterModule } from '@angular/router';

const components = [
  NavbarComponent,
  LayoutComponent,
  MatTableComponent
]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule
  ],
  exports:[
    ...components
  ]
})
export class SharedModule { }
