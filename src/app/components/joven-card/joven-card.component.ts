import { environment } from './../../../environments/environment';
import { SubirFotoComponent } from './../dialogs/subir-foto/subir-foto.component';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ErrorHandler,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Joven } from 'src/app/models/joven';
import { NuevoRegistroComponent } from '../dialogs/nuevo-registro/nuevo-registro.component';

@Component({
  selector: 'app-joven-card',
  templateUrl: './joven-card.component.html',
  styleUrls: ['./joven-card.component.scss'],
})
export class JovenCardComponent implements OnInit {
  @Input() joven!: Joven;
  urlBaseImg = `./assets/loading1.gif`;
  alert = false;
  diasDesdeLaUltimaMinistracion = 0;
  @Output() homeEmiter = new EventEmitter<boolean>();
  constructor(
    private readonly dialog: MatDialog,
    private readonly snack: MatSnackBar,
    private readonly api: ApiService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.setPhoto();
    }, 3000);
    this.alertValidation();
  }
  alertValidation(): void {
    if (this.joven.lastMinistration) {
      const fechaInicio = new Date(this.joven.lastMinistration).getTime();
      const fechaFin = new Date(new Date()).getTime();
      const diff = fechaFin - fechaInicio;
      const diasTranscurridos = diff / (1000 * 60 * 60 * 24);
      this.diasDesdeLaUltimaMinistracion = Math.floor(diasTranscurridos);
      if (this.diasDesdeLaUltimaMinistracion > 8) {
        this.alert = true;
      }
    } else {
      this.alert = true;
    }
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

  abrirDialogNuevoRegistro(joven: Joven): void {
    const dialogRef = this.dialog.open(NuevoRegistroComponent, { data: joven });
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
        this.homeEmiter.emit(true);
        window.location.reload();
      },
    });
  }

  abrirDialogSubirFoto(joven: Joven): void {
    const dialogRef = this.dialog.open(SubirFotoComponent, { data: joven });
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
        this.homeEmiter.emit(true);
        window.location.reload();
      },
    });
  }

  abrirPageJoven(_id: string): void {
    this.router.navigate(['joven', _id]);
  }

  eliminarJoven(_id: string): void {
    this.api.deleteJoven(_id).subscribe({
      next: (res: any) => {
        this.snack.open(res.message, 'ok', { duration: 3000 });
        this.homeEmiter.emit(true);
      },
      error: (error: ErrorHandler) => {
        console.error(error);
        this.snack.open('Error en el intento de eliminar al joven', 'ok', {
          duration: 3000,
        });
      },
    });
  }
}
