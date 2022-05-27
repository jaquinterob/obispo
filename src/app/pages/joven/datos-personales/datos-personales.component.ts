import { SubirFotoComponent } from './../../../components/dialogs/subir-foto/subir-foto.component';
import { environment } from './../../../../environments/environment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NuevoRegistroComponent } from 'src/app/components/dialogs/nuevo-registro/nuevo-registro.component';
import { Joven } from 'src/app/models/joven';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss'],
})
export class DatosPersonalesComponent implements OnInit {
  @Input() joven!: Joven;
  urlBaseImg = `./assets/loading.gif`;
  @Output() emisor = new EventEmitter();
  constructor(
    private readonly dialog: MatDialog,
    private readonly snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.joven = {
      _id: '',
      name: '',
      lastName: '',
      dob: new Date(),
      phone: '',
      gender: '',
      wishes: 0,
      talents: 0,
      concerns: 0,
      ministrations: 0,
      lastMinistration: new Date(),
    };
    setTimeout(() => {
      this.setPhoto();
    }, 2000);
  }
  setPhoto(): void {
    if (this.joven.photo) {
      this.urlBaseImg = `${environment.server}:8766/static/uploads/test/photos/${this.joven.photo}`;
    } else {
      if (this.joven.gender === 'M') {
        this.urlBaseImg = './assets/user.png';
      } else {
        this.urlBaseImg = './assets/mujer.jpg';
      }
    }
  }

  abrirModalNuevoRegistro(joven: Joven): void {
    const dialogRef = this.dialog.open(NuevoRegistroComponent, { data: joven });
    dialogRef
    .afterClosed()
    .subscribe({ next: (res: any) => this.emisor.emit(true) });
  }
  
  abrirModalSubirFoto(joven: Joven): void {
    const dialogRef = this.dialog.open(SubirFotoComponent, { data: joven });
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
        location.reload();
        this.emisor.emit(true);
      },
    });
  }
}
