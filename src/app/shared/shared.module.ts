import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { AppTableComponent } from './components/wrappers/app-table/app-table.component';
import { AppInputComponent } from './components/wrappers/app-input/app-input.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppErrorComponent } from './components/wrappers/app-error/app-error.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AppModalComponent } from './components/wrappers/app-modal/app-modal.component';
import { MatRadioModule } from '@angular/material/radio';
import { AppButtonComponent } from './components/wrappers/app-button/app-button.component';
import { TimeSpanPipe } from './pipes/time-span.pipe';
import { ConditionalTranslationPipe } from './pipes/conditional-translation.pipe';
import { AppAsyncPageComponent } from './components/wrappers/app-async-page/app-async-page.component';
import { MatStepperModule } from '@angular/material/stepper';
import { AppListComponent } from './components/wrappers/app-list/app-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

const MATERIAL_MODULES = [
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatMenuModule,
  MatInputModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSnackBarModule,
  MatDialogModule,
  MatRadioModule,
  MatStepperModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatTooltipModule,
  MatSortModule,
];

const APP_EXPORT_PARTS = [
  NavigationComponent,
  AppInputComponent,
  AppTableComponent,
  AppErrorComponent,
  AppModalComponent,
  AppButtonComponent,
  TimeSpanPipe,
  AppAsyncPageComponent,
  AppListComponent,
];

@NgModule({
  declarations: [
    ...APP_EXPORT_PARTS,
    ConditionalTranslationPipe
  ],
  exports: [
    TranslateModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ClipboardModule,
    ...APP_EXPORT_PARTS,
    ...MATERIAL_MODULES,
  ],
  imports: [
    TranslateModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ClipboardModule,
    ...MATERIAL_MODULES,
    MatPaginatorModule,
  ],
  providers: [
    TimeSpanPipe,
  ],
})
export class SharedModule {
}
