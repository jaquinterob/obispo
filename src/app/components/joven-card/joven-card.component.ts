import { ActivatedRoute, Router } from '@angular/router';
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
  @Output() homeEmiter = new EventEmitter<boolean>();
  constructor(
    private readonly dialog: MatDialog,
    private readonly snack: MatSnackBar,
    private readonly api: ApiService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.joven);
  }

  abrirDialogNuevoRegistro(joven: Joven): void {
    const dialogRef = this.dialog.open(NuevoRegistroComponent, { data: joven });
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
        this.homeEmiter.emit(true);
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
