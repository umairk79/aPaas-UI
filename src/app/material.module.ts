import { NgModule } from '@angular/core';

import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
} from '@angular/material';

import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatExpansionModule,
  MatGridListModule,
  MatChipsModule,
  MatSlideToggleModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }
