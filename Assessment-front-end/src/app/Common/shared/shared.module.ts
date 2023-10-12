import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { MatTableComponent } from './mat-table/mat-table.component';
import { RouterModule } from '@angular/router';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { LoaderComponent } from './loader/loader.component';
import { StarRatingComponent } from './star-rating/star-rating.component';

const components = [
  NavbarComponent,
  LayoutComponent,
  MatTableComponent,
  SearchFilterComponent,
  LoaderComponent,
  StarRatingComponent
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
