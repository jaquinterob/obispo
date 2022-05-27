import { ApiService } from 'src/app/api.service';
import { Joven } from './../../../models/joven';
import { Component, ErrorHandler, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subir-foto',
  templateUrl: './subir-foto.component.html',
  styleUrls: ['./subir-foto.component.scss'],
})
export class SubirFotoComponent {
  loader = false;
  filePhoto: File[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public joven: Joven,
    private readonly snack: MatSnackBar,
    private readonly apiService: ApiService,
    private readonly dialog: MatDialog
  ) {}

  onRemovePhoto(event: any): void {
    this.filePhoto.splice(this.filePhoto.indexOf(event), 1);
  }
  onSelectPhoto(event: any): void {
    this.snack.dismiss();
    this.filePhoto.push(...event.addedFiles);
    this.validationFileExtPhoto();
    if (this.filePhoto.length > 1) {
      this.replaceFilePhoto();
    }
  }

  validationFileExtPhoto(): boolean {
    const name = this.filePhoto[0].name;
    const nameSplit = name.split('.');
    const ext = nameSplit[nameSplit.length - 1];
    if (
      ext.toLowerCase() === 'jpg' ||
      ext.toLowerCase() === 'jpeg' ||
      ext.toLowerCase() === 'png'
    ) {
      return true;
    } else {
      this.snack.open(
        `Solo se permite la extención 'jpg', 'jpeg' ó 'png'`,
        '',
        {
          panelClass: ['mat-toolbar', 'mat-warn'],
          duration: 3000,
        }
      );
      this.filePhoto = [];
      return false;
    }
  }

  replaceFilePhoto(): void {
    this.filePhoto.splice(0, 1);
  }

  sendPhoto(): void {
    this.loader = true;
    const formData = new FormData();
    formData.append('photo', this.filePhoto[0]);
    formData.append('_id', this.joven._id);
    this.apiService.uploadPhoto(formData).subscribe({
      next: (res: any) => {
        this.loader = false;
        this.snack.open(res.message, 'ok', { duration: 3000 });
        if (res.ok) {
          this.dialog.closeAll();
        }
      },
      error: (error: ErrorHandler) => {
        this.loader = false;
        console.error(error);
        this.snack.open(`Error al subir imagen al servidor`, 'ok', {
          duration: 3000,
        });
      },
    });
  }
}
