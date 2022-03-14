import { Component, ErrorHandler, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/api.service';
import { Joven } from 'src/app/models/joven';
import { Select } from 'src/app/models/select';

@Component({
  selector: 'app-nuevo-registro',
  templateUrl: './nuevo-registro.component.html',
  styleUrls: ['./nuevo-registro.component.scss'],
})
export class NuevoRegistroComponent implements OnInit {
  formulario!: FormGroup;
  date = new Date();
  selectTipos: Select[] = [
    { texto: 'Talento', valor: 'talento' },
    { texto: 'Deseo', valor: 'deseo' },
    { texto: 'Preocupación', valor: 'preocupacion' },
    { texto: 'Ministración', valor: 'ministracion' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public joven: Joven,
    private readonly fb: FormBuilder,
    private readonly api: ApiService,
    private readonly snack: MatSnackBar,
    private readonly dialog: MatDialog
  ) {
    this.initFormulario();
  }

  ngOnInit(): void {
    console.log(this.joven._id);
  }

  initFormulario(): void {
    this.formulario = this.fb.group({
      idYoung: [this.joven._id, Validators.required],
      type: ['', Validators.required],
      title: ['', Validators.required],
      detail: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  guardarNuevoRegistro(): void {
    this.api.guardarNuevoRegistro(this.formulario.value).subscribe({
      next: (res: any) => {
        this.snack.open(res.message, 'ok', {
          duration: 3000,
        });
        if (res.ok) {
          this.dialog.closeAll();
        }
      },
      error: (error: ErrorHandler) => {
        console.error(error);
        this.snack.open('Error al guardar el registro', 'ok', {
          duration: 3000,
        });
      },
    });
  }
}
