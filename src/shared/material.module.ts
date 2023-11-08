import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatIconModule } from '@angular/material/icon';

import { MatDialogModule } from '@angular/material/dialog';

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatGridListModule } from '@angular/material/grid-list';

import { MatListModule } from '@angular/material/list';

import { MatTooltipModule } from '@angular/material/tooltip';

import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';

import { MatTabsModule } from '@angular/material/tabs';

import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatDatepickerModule } from '@angular/material/datepicker';

import {
  MatNativeDateModule,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatCardModule } from '@angular/material/card';

import { MatMenuModule } from '@angular/material/menu';

import { MatTableModule } from '@angular/material/table';

import { MatSortModule } from '@angular/material/sort';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatExpansionModule } from '@angular/material/expansion';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatRadioModule } from '@angular/material/radio';

const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatSidenavModule,
  MatGridListModule,
  MatListModule,
  MatTooltipModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatCardModule,
  MatMenuModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatRadioModule,
];
@NgModule({
  declarations: [],
  imports: [CommonModule, ...materialModules],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  exports: [...materialModules],
})
export class MaterialModule {}
