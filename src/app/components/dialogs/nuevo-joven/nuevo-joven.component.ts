import { LocalstorageService } from './../../../localstorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/api.service';
import { Component, ErrorHandler } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nuevo-joven',
  templateUrl: './nuevo-joven.component.html',
  styleUrls: ['./nuevo-joven.component.scss'],
})
export class NuevoJovenComponent {
  formulario!: FormGroup;
  today = new Date()
  constructor(
    private readonly fb: FormBuilder,
    private readonly api: ApiService,
    private readonly localstorageService:LocalstorageService,
    private readonly snack: MatSnackBar,
    private readonly dialog: MatDialog
  ) {
    this.initFormulario();
  }

  initFormulario(): void {
    const dataObispo = JSON.parse(
      this.localstorageService.decrypt(localStorage.getItem('obispo') || 'null')
    );
    this.formulario = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      ward: [dataObispo['ward']],
    });
  }

  guardarNuevoJoven(): void {
    this.api.guardarNuevoJoven(this.formulario.value).subscribe({
      next: (res: any) => {
        if (res.ok) {
          this.snack.open('Joven guardado correctamente', 'ok', {
            duration: 3000,
          });
          this.formulario.reset();
          this.dialog.closeAll();
        } else {
          this.snack.open(res.message, 'ok', {
            duration: 3000,
          });
        }
      },
      error: (error: ErrorHandler) => {
        console.error(error);
        this.snack.open('Error al comunicarnos con el servidor', '=(', {
          duration: 3000,
        });
      },
    });
  }
}
