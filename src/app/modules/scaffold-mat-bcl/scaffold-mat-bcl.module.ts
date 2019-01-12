import { NgModule } from '@angular/core';
import { MatIconModule, MatButtonModule, MatPaginatorModule, MatMenuModule, MatTableModule, MatCheckboxModule, MatSortModule, MatTabsModule, MatFormFieldModule, MatRadioModule, MatSelectModule, MatInputModule, MatSidenavModule, MatDatepickerModule, MatToolbarModule, MatTooltipModule, MatStepperModule, MatSnackBarModule, MatNativeDateModule, MatProgressBarModule, MatAutocompleteModule, MatExpansionModule, MAT_DATE_LOCALE, } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    MatIconModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatMenuModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    DragDropModule,
    CdkTableModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    MatIconModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTableModule,
    DragDropModule,
    MatSortModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    CdkTableModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'cn-GB'},
  ]
})
export class ScaffoldMatBclModule { }
