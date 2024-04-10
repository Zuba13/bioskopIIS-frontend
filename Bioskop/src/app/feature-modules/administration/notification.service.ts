import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  openSuccessSnackBar(message: string): void {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: ['success-snackbar', 'custom-snackbar'], // Add custom-snackbar class for styling
      horizontalPosition: 'end', // Align to the end (right) of the screen
      verticalPosition: 'top', // Position at the top of the screen
    };
    this.snackBar.open(message, 'Close', config);
  }

  openErrorSnackBar(message: string): void {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: ['error-snackbar', 'custom-snackbar'], // Add custom-snackbar class for styling
    };
    this.snackBar.open(message, 'Close', config);
  }

  openCustomSnackBar(message: string, panelClass: string): void {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: [panelClass, 'custom-snackbar'], // Add custom-snackbar class for styling
      horizontalPosition: 'end', // Align to the end (right) of the screen
      verticalPosition: 'top', // Position at the top of the screen
    };
    this.snackBar.open(message, 'Close', config);
  }
}
