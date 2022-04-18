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
  }

  abrirModalNuevoRegistro(joven: Joven): void {
    const dialogRef = this.dialog.open(NuevoRegistroComponent, { data: joven });
    dialogRef
      .afterClosed()
      .subscribe({ next: (res: any) => this.emisor.emit(true) });
  }
}
