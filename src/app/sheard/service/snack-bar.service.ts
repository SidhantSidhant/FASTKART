import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackbar : MatSnackBar) { }

  openSnackBar(message: string, action: string, position ?: any) {
    this._snackbar.open(message, action);
  }
}
