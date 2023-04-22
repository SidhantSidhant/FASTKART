import { NgModule } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button"
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSortModule} from "@angular/material/sort";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card"
import {MatDialogModule} from "@angular/material/dialog"

@NgModule({
    imports: [
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatPaginatorModule,
        MatTableModule,
        MatFormFieldModule,
        MatSortModule,
        MatSnackBarModule,
        MatCardModule,
        MatDialogModule
    ],
    exports: [
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatPaginatorModule,
        MatTableModule,
        MatFormFieldModule,
        MatSortModule,
        MatSnackBarModule,
        MatCardModule,
        MatDialogModule
    ]
})
export class MaterialModule {

}

